# Please do not use
#     from __future__ import annotations
# in modules such as this one where hybrid cloud service classes and data models are
# defined, because we want to reflect on type annotations and avoid forward references.

import abc
import datetime
import hmac
from dataclasses import dataclass
from hashlib import sha256
from typing import TYPE_CHECKING, Any, List, Mapping, Optional, Protocol, cast

from pydantic.fields import Field
from typing_extensions import TypedDict

from sentry.constants import SentryAppInstallationStatus, SentryAppStatus
from sentry.models import SentryApp, SentryAppInstallation
from sentry.models.apiapplication import ApiApplication
from sentry.services.hybrid_cloud import RpcModel
from sentry.services.hybrid_cloud.filter_query import OpaqueSerializedResponse
from sentry.services.hybrid_cloud.rpc import RpcService, rpc_method
from sentry.services.hybrid_cloud.user import RpcUser
from sentry.silo import SiloMode

if TYPE_CHECKING:
    from sentry.mediators.external_requests.alert_rule_action_requester import AlertRuleActionResult
    from sentry.services.hybrid_cloud.auth import AuthenticationContext


class RpcApiApplication(RpcModel):
    id: int = -1
    client_id: str = ""
    client_secret: str = ""


class RpcSentryAppService(RpcModel):
    """
    A `SentryAppService` (a notification service) wrapped up and serializable via the
    rpc interface.
    """

    title: str = ""
    slug: str = ""
    service_type: str = "sentry_app"


class RpcSentryApp(RpcModel):
    id: int = -1
    scope_list: List[str] = Field(default_factory=list)
    application_id: int = -1
    application: RpcApiApplication = Field(default_factory=RpcApiApplication)
    proxy_user_id: Optional[int] = None  # can be null on deletion.
    owner_id: int = -1  # relation to an organization
    name: str = ""
    slug: str = ""
    uuid: str = ""
    events: List[str] = Field(default_factory=list)
    webhook_url: Optional[str] = None
    is_published: bool = False
    is_unpublished: bool = False
    is_internal: bool = True
    is_publish_request_inprogress: bool = False
    status: str = ""

    def show_auth_info(self, access: Any) -> bool:
        encoded_scopes = set({"%s" % scope for scope in list(access.scopes)})
        return set(self.scope_list).issubset(encoded_scopes)

    def build_signature(self, body: str) -> str:
        secret = self.application.client_secret
        return hmac.new(
            key=secret.encode("utf-8"), msg=body.encode("utf-8"), digestmod=sha256
        ).hexdigest()

    # Properties are copied from the sentry app ORM model.
    @property
    def slug_for_metrics(self) -> str:
        if self.is_internal:
            return "internal"
        if self.is_unpublished:
            return "unpublished"
        return self.slug


class RpcSentryAppInstallation(RpcModel):
    id: int = -1
    organization_id: int = -1
    status: int = SentryAppInstallationStatus.PENDING
    sentry_app: RpcSentryApp = Field(default_factory=lambda: RpcSentryApp())
    date_deleted: Optional[datetime.datetime] = None
    uuid: str = ""


class RpcSentryAppComponent(RpcModel):
    uuid: str = ""
    sentry_app_id: int = -1
    type: str = ""
    app_schema: Mapping[str, Any] = Field(default_factory=dict)


class SentryAppEventDataInterface(Protocol):
    """
    Protocol making RpcSentryAppEvents capable of consuming from various sources, keeping only
    the minimum required properties.
    """

    id: str
    label: str

    @property
    def actionType(self) -> str:
        pass

    def is_enabled(self) -> bool:
        pass


@dataclass  # TODO: Make compatible with RpcModel
class RpcSentryAppEventData(SentryAppEventDataInterface):
    id: str = ""
    label: str = ""
    action_type: str = ""
    enabled: bool = True

    @property
    def actionType(self) -> str:
        return self.action_type

    def is_enabled(self) -> bool:
        return self.enabled

    @classmethod
    def from_event(cls, data_interface: SentryAppEventDataInterface) -> "RpcSentryAppEventData":
        return RpcSentryAppEventData(
            id=data_interface.id,
            label=data_interface.label,
            action_type=data_interface.actionType,
            enabled=data_interface.is_enabled(),
        )


class SentryAppInstallationFilterArgs(TypedDict, total=False):
    installation_ids: List[int]
    app_ids: List[int]
    organization_id: int
    uuids: List[str]


class AppService(RpcService):
    key = "app"
    local_mode = SiloMode.CONTROL

    @classmethod
    def get_local_implementation(cls) -> RpcService:
        from sentry.services.hybrid_cloud.app.impl import DatabaseBackedAppService

        return DatabaseBackedAppService()

    @rpc_method
    @abc.abstractmethod
    def serialize_many(
        self,
        *,
        filter: SentryAppInstallationFilterArgs,
        as_user: Optional[RpcUser] = None,
        auth_context: Optional["AuthenticationContext"] = None,
    ) -> List[OpaqueSerializedResponse]:
        pass

    @rpc_method
    @abc.abstractmethod
    def get_many(
        self, *, filter: SentryAppInstallationFilterArgs
    ) -> List[RpcSentryAppInstallation]:
        pass

    @rpc_method
    @abc.abstractmethod
    def find_installation_by_proxy_user(
        self, *, proxy_user_id: int, organization_id: int
    ) -> Optional[RpcSentryAppInstallation]:
        pass

    @rpc_method
    @abc.abstractmethod
    def get_installed_for_organization(
        self,
        *,
        organization_id: int,
    ) -> List[RpcSentryAppInstallation]:
        pass

    @rpc_method
    @abc.abstractmethod
    def get_sentry_app_by_slug(self, *, slug: str) -> Optional[RpcSentryApp]:
        pass

    @rpc_method
    @abc.abstractmethod
    def find_alertable_services(self, *, organization_id: int) -> List[RpcSentryAppService]:
        pass

    @classmethod
    def serialize_sentry_app(cls, app: SentryApp) -> RpcSentryApp:
        return RpcSentryApp(
            id=app.id,
            scope_list=app.scope_list,
            application_id=app.application_id,
            application=cls.serialize_api_application(app.application),
            proxy_user_id=app.proxy_user_id,
            owner_id=app.owner_id,
            name=app.name,
            slug=app.slug,
            uuid=app.uuid,
            events=app.events,
            webhook_url=app.webhook_url,
            is_published=app.status == SentryAppStatus.PUBLISHED,
            is_unpublished=app.status == SentryAppStatus.UNPUBLISHED,
            is_internal=app.status == SentryAppStatus.INTERNAL,
            is_publish_request_inprogress=app.status == SentryAppStatus.PUBLISH_REQUEST_INPROGRESS,
            status=app.status,
        )

    @classmethod
    def serialize_api_application(self, api_app: ApiApplication) -> RpcApiApplication:
        return RpcApiApplication(
            id=api_app.id,
            client_id=api_app.client_id,
            client_secret=api_app.client_secret,
        )

    @rpc_method
    @abc.abstractmethod
    def find_service_hook_sentry_app(self, *, api_application_id: int) -> Optional[RpcSentryApp]:
        pass

    @rpc_method
    @abc.abstractmethod
    def get_custom_alert_rule_actions(
        self,
        *,
        event_data: RpcSentryAppEventData,
        organization_id: int,
        project_slug: Optional[str],
    ) -> List[Mapping[str, Any]]:
        pass

    @rpc_method
    @abc.abstractmethod
    def find_app_components(self, *, app_id: int) -> List[RpcSentryAppComponent]:
        pass

    @rpc_method
    @abc.abstractmethod
    def get_related_sentry_app_components(
        self,
        *,
        organization_ids: List[int],
        sentry_app_ids: List[int],
        type: str,
        group_by: str = "sentry_app_id",
    ) -> Mapping[str, Any]:
        pass

    @classmethod
    def serialize_sentry_app_installation(
        cls, installation: SentryAppInstallation, app: Optional[SentryApp] = None
    ) -> RpcSentryAppInstallation:
        if app is None:
            app = installation.sentry_app

        return RpcSentryAppInstallation(
            id=installation.id,
            organization_id=installation.organization_id,
            status=installation.status,
            sentry_app=cls.serialize_sentry_app(app),
            date_deleted=installation.date_deleted,
            uuid=installation.uuid,
        )

    @rpc_method
    @abc.abstractmethod
    def trigger_sentry_app_action_creators(
        self, *, fields: List[Mapping[str, Any]], install_uuid: Optional[str]
    ) -> "AlertRuleActionResult":
        pass


app_service = cast(AppService, AppService.create_delegation())
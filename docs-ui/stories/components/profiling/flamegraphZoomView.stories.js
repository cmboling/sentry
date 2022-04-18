import {Flamegraph} from 'sentry/components/profiling/flamegraph';
import {FullScreenFlamegraphContainer} from 'sentry/components/profiling/fullScreenFlamegraphContainer';
import {FlamegraphStateProvider} from 'sentry/utils/profiling/flamegraph/flamegraphStateProvider';
import {FlamegraphThemeProvider} from 'sentry/utils/profiling/flamegraph/flamegraphThemeProvider';
import {importProfile} from 'sentry/utils/profiling/profile/importProfile';

export default {
  title: 'Components/Profiling/FlamegraphZoomView',
};

const eventedProfiles = importProfile(require('./EventedTrace.json'));

export const EventedTrace = () => {
  return (
    <FlamegraphStateProvider>
      <FlamegraphThemeProvider>
        <FullScreenFlamegraphContainer>
          <Flamegraph profiles={eventedProfiles} />
        </FullScreenFlamegraphContainer>
      </FlamegraphThemeProvider>
    </FlamegraphStateProvider>
  );
};

const sampledTrace = importProfile(require('./SampledTrace.json'));

export const SampledTrace = () => {
  return (
    <FlamegraphStateProvider>
      <FlamegraphThemeProvider>
        <FullScreenFlamegraphContainer>
          <Flamegraph profiles={sampledTrace} />
        </FullScreenFlamegraphContainer>
      </FlamegraphThemeProvider>
    </FlamegraphStateProvider>
  );
};

const jsSelfProfile = importProfile(require('./JSSelfProfilingTrace.json'));

export const JSSelfProfiling = () => {
  return (
    <FlamegraphStateProvider>
      <FlamegraphThemeProvider>
        <FullScreenFlamegraphContainer>
          {jsSelfProfile ? <Flamegraph profiles={jsSelfProfile} /> : null}
        </FullScreenFlamegraphContainer>
      </FlamegraphThemeProvider>
    </FlamegraphStateProvider>
  );
};

const typescriptProfile = importProfile(
  require('./../../../../tests/js/spec/utils/profiling/profile/samples/chrometrace/typescript/trace.json')
);

export const TypescriptProfile = () => {
  return (
    <FlamegraphStateProvider>
      <FlamegraphThemeProvider>
        <FullScreenFlamegraphContainer>
          {typescriptProfile ? <Flamegraph profiles={typescriptProfile} /> : null}
        </FullScreenFlamegraphContainer>
      </FlamegraphThemeProvider>
    </FlamegraphStateProvider>
  );
};

import {transformSessionsResponseToSeries} from 'sentry/views/dashboardsV2/widgetCard/transformSessionsResponseToSeries';

describe('transformSessionsResponseToSeries', function () {
  it('transforms sessions into series', () => {
    expect(
      transformSessionsResponseToSeries(
        TestStubs.MetricsSessionUserCountByStatusByRelease()
      )
    ).toEqual([
      {
        seriesName: 'sum(sentry.sessions.session)|session.status:crashed|release:1',
        data: [
          {name: '2022-01-15T00:00:00Z', value: 0},
          {name: '2022-01-16T00:00:00Z', value: 0},
          {name: '2022-01-17T00:00:00Z', value: 0},
          {name: '2022-01-18T00:00:00Z', value: 0},
          {name: '2022-01-19T00:00:00Z', value: 0},
          {name: '2022-01-20T00:00:00Z', value: 0},
          {name: '2022-01-21T00:00:00Z', value: 0},
          {name: '2022-01-22T00:00:00Z', value: 0},
          {name: '2022-01-23T00:00:00Z', value: 0},
          {name: '2022-01-24T00:00:00Z', value: 23},
          {name: '2022-01-25T00:00:00Z', value: 11},
          {name: '2022-01-26T00:00:00Z', value: 0},
          {name: '2022-01-27T00:00:00Z', value: 0},
          {name: '2022-01-28T00:00:00Z', value: 0},
        ],
      },
      {
        seriesName: 'count_unique(sentry.sessions.user)|session.status:crashed|release:1',
        data: [
          {name: '2022-01-15T00:00:00Z', value: 0},
          {name: '2022-01-16T00:00:00Z', value: 0},
          {name: '2022-01-17T00:00:00Z', value: 0},
          {name: '2022-01-18T00:00:00Z', value: 0},
          {name: '2022-01-19T00:00:00Z', value: 0},
          {name: '2022-01-20T00:00:00Z', value: 0},
          {name: '2022-01-21T00:00:00Z', value: 0},
          {name: '2022-01-22T00:00:00Z', value: 0},
          {name: '2022-01-23T00:00:00Z', value: 0},
          {name: '2022-01-24T00:00:00Z', value: 1},
          {name: '2022-01-25T00:00:00Z', value: 1},
          {name: '2022-01-26T00:00:00Z', value: 0},
          {name: '2022-01-27T00:00:00Z', value: 0},
          {name: '2022-01-28T00:00:00Z', value: 0},
        ],
      },
      {
        seriesName: 'sum(sentry.sessions.session)|session.status:abnormal|release:1',
        data: [
          {name: '2022-01-15T00:00:00Z', value: 1},
          {name: '2022-01-16T00:00:00Z', value: 0},
          {name: '2022-01-17T00:00:00Z', value: 0},
          {name: '2022-01-18T00:00:00Z', value: 0},
          {name: '2022-01-19T00:00:00Z', value: 0},
          {name: '2022-01-20T00:00:00Z', value: 0},
          {name: '2022-01-21T00:00:00Z', value: 0},
          {name: '2022-01-22T00:00:00Z', value: 0},
          {name: '2022-01-23T00:00:00Z', value: 0},
          {name: '2022-01-24T00:00:00Z', value: 0},
          {name: '2022-01-25T00:00:00Z', value: 0},
          {name: '2022-01-26T00:00:00Z', value: 0},
          {name: '2022-01-27T00:00:00Z', value: 0},
          {name: '2022-01-28T00:00:00Z', value: 0},
        ],
      },
      {
        seriesName:
          'count_unique(sentry.sessions.user)|session.status:abnormal|release:1',
        data: [
          {name: '2022-01-15T00:00:00Z', value: 1},
          {name: '2022-01-16T00:00:00Z', value: 0},
          {name: '2022-01-17T00:00:00Z', value: 0},
          {name: '2022-01-18T00:00:00Z', value: 0},
          {name: '2022-01-19T00:00:00Z', value: 0},
          {name: '2022-01-20T00:00:00Z', value: 0},
          {name: '2022-01-21T00:00:00Z', value: 0},
          {name: '2022-01-22T00:00:00Z', value: 0},
          {name: '2022-01-23T00:00:00Z', value: 0},
          {name: '2022-01-24T00:00:00Z', value: 0},
          {name: '2022-01-25T00:00:00Z', value: 0},
          {name: '2022-01-26T00:00:00Z', value: 0},
          {name: '2022-01-27T00:00:00Z', value: 0},
          {name: '2022-01-28T00:00:00Z', value: 0},
        ],
      },
      {
        seriesName: 'sum(sentry.sessions.session)|session.status:errored|release:1',
        data: [
          {name: '2022-01-15T00:00:00Z', value: 0},
          {name: '2022-01-16T00:00:00Z', value: 0},
          {name: '2022-01-17T00:00:00Z', value: 0},
          {name: '2022-01-18T00:00:00Z', value: 0},
          {name: '2022-01-19T00:00:00Z', value: 0},
          {name: '2022-01-20T00:00:00Z', value: 37},
          {name: '2022-01-21T00:00:00Z', value: 0},
          {name: '2022-01-22T00:00:00Z', value: 0},
          {name: '2022-01-23T00:00:00Z', value: 0},
          {name: '2022-01-24T00:00:00Z', value: 335},
          {name: '2022-01-25T00:00:00Z', value: 79},
          {name: '2022-01-26T00:00:00Z', value: 0},
          {name: '2022-01-27T00:00:00Z', value: 0},
          {name: '2022-01-28T00:00:00Z', value: 0},
        ],
      },
      {
        seriesName: 'count_unique(sentry.sessions.user)|session.status:errored|release:1',
        data: [
          {name: '2022-01-15T00:00:00Z', value: 0},
          {name: '2022-01-16T00:00:00Z', value: 0},
          {name: '2022-01-17T00:00:00Z', value: 0},
          {name: '2022-01-18T00:00:00Z', value: 0},
          {name: '2022-01-19T00:00:00Z', value: 0},
          {name: '2022-01-20T00:00:00Z', value: 1},
          {name: '2022-01-21T00:00:00Z', value: 0},
          {name: '2022-01-22T00:00:00Z', value: 0},
          {name: '2022-01-23T00:00:00Z', value: 0},
          {name: '2022-01-24T00:00:00Z', value: 2},
          {name: '2022-01-25T00:00:00Z', value: 2},
          {name: '2022-01-26T00:00:00Z', value: 0},
          {name: '2022-01-27T00:00:00Z', value: 0},
          {name: '2022-01-28T00:00:00Z', value: 0},
        ],
      },
      {
        seriesName: 'sum(sentry.sessions.session)|session.status:healthy|release:1',
        data: [
          {name: '2022-01-15T00:00:00Z', value: 0},
          {name: '2022-01-16T00:00:00Z', value: 0},
          {name: '2022-01-17T00:00:00Z', value: 0},
          {name: '2022-01-18T00:00:00Z', value: 0},
          {name: '2022-01-19T00:00:00Z', value: 0},
          {name: '2022-01-20T00:00:00Z', value: 2503},
          {name: '2022-01-21T00:00:00Z', value: 661},
          {name: '2022-01-22T00:00:00Z', value: 0},
          {name: '2022-01-23T00:00:00Z', value: 0},
          {name: '2022-01-24T00:00:00Z', value: 1464},
          {name: '2022-01-25T00:00:00Z', value: 430},
          {name: '2022-01-26T00:00:00Z', value: 0},
          {name: '2022-01-27T00:00:00Z', value: 0},
          {name: '2022-01-28T00:00:00Z', value: 0},
        ],
      },
      {
        seriesName: 'count_unique(sentry.sessions.user)|session.status:healthy|release:1',
        data: [
          {name: '2022-01-15T00:00:00Z', value: 0},
          {name: '2022-01-16T00:00:00Z', value: 0},
          {name: '2022-01-17T00:00:00Z', value: 0},
          {name: '2022-01-18T00:00:00Z', value: 0},
          {name: '2022-01-19T00:00:00Z', value: 0},
          {name: '2022-01-20T00:00:00Z', value: 3},
          {name: '2022-01-21T00:00:00Z', value: 3},
          {name: '2022-01-22T00:00:00Z', value: 0},
          {name: '2022-01-23T00:00:00Z', value: 0},
          {name: '2022-01-24T00:00:00Z', value: 1},
          {name: '2022-01-25T00:00:00Z', value: 1},
          {name: '2022-01-26T00:00:00Z', value: 0},
          {name: '2022-01-27T00:00:00Z', value: 0},
          {name: '2022-01-28T00:00:00Z', value: 0},
        ],
      },
      {
        seriesName: 'sum(sentry.sessions.session)|session.status:crashed|release:2',
        data: [
          {name: '2022-01-15T00:00:00Z', value: 1},
          {name: '2022-01-16T00:00:00Z', value: 0},
          {name: '2022-01-17T00:00:00Z', value: 0},
          {name: '2022-01-18T00:00:00Z', value: 0},
          {name: '2022-01-19T00:00:00Z', value: 0},
          {name: '2022-01-20T00:00:00Z', value: 0},
          {name: '2022-01-21T00:00:00Z', value: 0},
          {name: '2022-01-22T00:00:00Z', value: 0},
          {name: '2022-01-23T00:00:00Z', value: 0},
          {name: '2022-01-24T00:00:00Z', value: 23},
          {name: '2022-01-25T00:00:00Z', value: 11},
          {name: '2022-01-26T00:00:00Z', value: 0},
          {name: '2022-01-27T00:00:00Z', value: 0},
          {name: '2022-01-28T00:00:00Z', value: 0},
        ],
      },
      {
        seriesName: 'count_unique(sentry.sessions.user)|session.status:crashed|release:2',
        data: [
          {name: '2022-01-15T00:00:00Z', value: 1},
          {name: '2022-01-16T00:00:00Z', value: 0},
          {name: '2022-01-17T00:00:00Z', value: 0},
          {name: '2022-01-18T00:00:00Z', value: 0},
          {name: '2022-01-19T00:00:00Z', value: 0},
          {name: '2022-01-20T00:00:00Z', value: 0},
          {name: '2022-01-21T00:00:00Z', value: 0},
          {name: '2022-01-22T00:00:00Z', value: 0},
          {name: '2022-01-23T00:00:00Z', value: 0},
          {name: '2022-01-24T00:00:00Z', value: 2},
          {name: '2022-01-25T00:00:00Z', value: 2},
          {name: '2022-01-26T00:00:00Z', value: 0},
          {name: '2022-01-27T00:00:00Z', value: 0},
          {name: '2022-01-28T00:00:00Z', value: 0},
        ],
      },
      {
        seriesName: 'sum(sentry.sessions.session)|session.status:abnormal|release:2',
        data: [
          {name: '2022-01-15T00:00:00Z', value: 1},
          {name: '2022-01-16T00:00:00Z', value: 0},
          {name: '2022-01-17T00:00:00Z', value: 0},
          {name: '2022-01-18T00:00:00Z', value: 0},
          {name: '2022-01-19T00:00:00Z', value: 0},
          {name: '2022-01-20T00:00:00Z', value: 0},
          {name: '2022-01-21T00:00:00Z', value: 0},
          {name: '2022-01-22T00:00:00Z', value: 0},
          {name: '2022-01-23T00:00:00Z', value: 0},
          {name: '2022-01-24T00:00:00Z', value: 0},
          {name: '2022-01-25T00:00:00Z', value: 0},
          {name: '2022-01-26T00:00:00Z', value: 0},
          {name: '2022-01-27T00:00:00Z', value: 0},
          {name: '2022-01-28T00:00:00Z', value: 0},
        ],
      },
      {
        seriesName:
          'count_unique(sentry.sessions.user)|session.status:abnormal|release:2',
        data: [
          {name: '2022-01-15T00:00:00Z', value: 1},
          {name: '2022-01-16T00:00:00Z', value: 0},
          {name: '2022-01-17T00:00:00Z', value: 0},
          {name: '2022-01-18T00:00:00Z', value: 0},
          {name: '2022-01-19T00:00:00Z', value: 0},
          {name: '2022-01-20T00:00:00Z', value: 0},
          {name: '2022-01-21T00:00:00Z', value: 0},
          {name: '2022-01-22T00:00:00Z', value: 0},
          {name: '2022-01-23T00:00:00Z', value: 0},
          {name: '2022-01-24T00:00:00Z', value: 0},
          {name: '2022-01-25T00:00:00Z', value: 0},
          {name: '2022-01-26T00:00:00Z', value: 0},
          {name: '2022-01-27T00:00:00Z', value: 0},
          {name: '2022-01-28T00:00:00Z', value: 0},
        ],
      },
      {
        seriesName: 'sum(sentry.sessions.session)|session.status:errored|release:2',
        data: [
          {name: '2022-01-15T00:00:00Z', value: 1},
          {name: '2022-01-16T00:00:00Z', value: 0},
          {name: '2022-01-17T00:00:00Z', value: 0},
          {name: '2022-01-18T00:00:00Z', value: 0},
          {name: '2022-01-19T00:00:00Z', value: 0},
          {name: '2022-01-20T00:00:00Z', value: 37},
          {name: '2022-01-21T00:00:00Z', value: 0},
          {name: '2022-01-22T00:00:00Z', value: 0},
          {name: '2022-01-23T00:00:00Z', value: 0},
          {name: '2022-01-24T00:00:00Z', value: 335},
          {name: '2022-01-25T00:00:00Z', value: 79},
          {name: '2022-01-26T00:00:00Z', value: 0},
          {name: '2022-01-27T00:00:00Z', value: 0},
          {name: '2022-01-28T00:00:00Z', value: 0},
        ],
      },
      {
        seriesName: 'count_unique(sentry.sessions.user)|session.status:errored|release:2',
        data: [
          {name: '2022-01-15T00:00:00Z', value: 1},
          {name: '2022-01-16T00:00:00Z', value: 0},
          {name: '2022-01-17T00:00:00Z', value: 0},
          {name: '2022-01-18T00:00:00Z', value: 0},
          {name: '2022-01-19T00:00:00Z', value: 0},
          {name: '2022-01-20T00:00:00Z', value: 1},
          {name: '2022-01-21T00:00:00Z', value: 0},
          {name: '2022-01-22T00:00:00Z', value: 0},
          {name: '2022-01-23T00:00:00Z', value: 0},
          {name: '2022-01-24T00:00:00Z', value: 1},
          {name: '2022-01-25T00:00:00Z', value: 1},
          {name: '2022-01-26T00:00:00Z', value: 0},
          {name: '2022-01-27T00:00:00Z', value: 0},
          {name: '2022-01-28T00:00:00Z', value: 0},
        ],
      },
      {
        seriesName: 'sum(sentry.sessions.session)|session.status:healthy|release:2',
        data: [
          {name: '2022-01-15T00:00:00Z', value: 1},
          {name: '2022-01-16T00:00:00Z', value: 0},
          {name: '2022-01-17T00:00:00Z', value: 0},
          {name: '2022-01-18T00:00:00Z', value: 0},
          {name: '2022-01-19T00:00:00Z', value: 0},
          {name: '2022-01-20T00:00:00Z', value: 2503},
          {name: '2022-01-21T00:00:00Z', value: 661},
          {name: '2022-01-22T00:00:00Z', value: 0},
          {name: '2022-01-23T00:00:00Z', value: 0},
          {name: '2022-01-24T00:00:00Z', value: 1464},
          {name: '2022-01-25T00:00:00Z', value: 430},
          {name: '2022-01-26T00:00:00Z', value: 0},
          {name: '2022-01-27T00:00:00Z', value: 0},
          {name: '2022-01-28T00:00:00Z', value: 0},
        ],
      },
      {
        seriesName: 'count_unique(sentry.sessions.user)|session.status:healthy|release:2',
        data: [
          {name: '2022-01-15T00:00:00Z', value: 1},
          {name: '2022-01-16T00:00:00Z', value: 0},
          {name: '2022-01-17T00:00:00Z', value: 0},
          {name: '2022-01-18T00:00:00Z', value: 0},
          {name: '2022-01-19T00:00:00Z', value: 0},
          {name: '2022-01-20T00:00:00Z', value: 10},
          {name: '2022-01-21T00:00:00Z', value: 3},
          {name: '2022-01-22T00:00:00Z', value: 0},
          {name: '2022-01-23T00:00:00Z', value: 0},
          {name: '2022-01-24T00:00:00Z', value: 4},
          {name: '2022-01-25T00:00:00Z', value: 3},
          {name: '2022-01-26T00:00:00Z', value: 0},
          {name: '2022-01-27T00:00:00Z', value: 0},
          {name: '2022-01-28T00:00:00Z', value: 0},
        ],
      },
    ]);
  });

  it('supports legend aliases', () => {
    expect(
      transformSessionsResponseToSeries(
        TestStubs.MetricsSessionUserCountByStatusByRelease(),
        undefined,
        'Lorem'
      )[0]
    ).toEqual(
      expect.objectContaining({
        seriesName:
          'Lorem: sum(sentry.sessions.session)|session.status:crashed|release:1',
      })
    );
  });
  it('returns correct number of series if limit is set', () => {
    expect(
      transformSessionsResponseToSeries(
        TestStubs.MetricsSessionUserCountByStatusByRelease(),
        undefined,
        'Lorem'
      ).length
    ).toEqual(16);

    // limit = 3 returns 6 series, 3 for count_unique and 3 for sum
    expect(
      transformSessionsResponseToSeries(
        TestStubs.MetricsSessionUserCountByStatusByRelease(),
        3,
        'Lorem'
      ).length
    ).toEqual(6);
  });
});

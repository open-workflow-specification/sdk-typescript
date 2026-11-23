import { type } from 'ts-inference-check';
import { Specification } from '../../src';

describe('Workflow plain object', () => {
  it('should type a plain object workflow with one task ', () => {
    const workflow: Specification.Workflow = {
      document: {
        dsl: '1.1.0',
        namespace: 'examples',
        name: 'accumulate-room-readings',
        version: '0.1.0',
      },
      do: [
        {
          step1: {
            set: {
              foo: 'bar',
            },
          },
        },
      ],
    };
    expect(type(workflow).is<Specification.Workflow>(true));
  });
  it('should type a plain object workflow with multiple tasks', () => {
    const workflow: Specification.Workflow = {
      document: {
        dsl: '1.1.0',
        namespace: 'examples',
        name: 'accumulate-room-readings',
        version: '0.1.0',
      },
      do: [
        {
          consumeReading: {
            listen: {
              to: {
                all: [
                  {
                    with: {
                      source: 'https://my.home.com/sensor',
                      type: 'my.home.sensors.temperature',
                    },
                    correlate: {
                      roomId: {
                        from: '.roomid',
                      },
                    },
                  },
                  {
                    with: {
                      source: 'https://my.home.com/sensor',
                      type: 'my.home.sensors.humidity',
                    },
                    correlate: {
                      roomId: {
                        from: '.roomid',
                      },
                    },
                  },
                ],
              },
            },
            output: {
              as: '.data.reading',
            },
          },
        },
        {
          logReading: {
            for: {
              each: 'reading',
              in: '.readings',
            },
            do: [
              {
                callOrderService: {
                  call: 'openapi',
                  with: {
                    document: {
                      endpoint: 'http://myorg.io/ordersservices.json',
                    },
                    operationId: 'logreading',
                  },
                },
              },
            ],
          },
        },
        {
          generateReport: {
            call: 'openapi',
            with: {
              document: {
                endpoint: 'http://myorg.io/ordersservices.json',
              },
              operationId: 'produceReport',
            },
          },
        },
      ],
      timeout: {
        after: {
          hours: 1,
        },
      },
    };
    expect(type(workflow).is<Specification.Workflow>(true));
  });
});

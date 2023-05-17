import middy from "@middy/core";

export interface Schema {
  detail: {
    entityId: string;
    name: string;
  };
}

const logCloudwatchMetricRecord = (eventName, count, name, id) => {
  console.log(
    JSON.stringify({
      _aws: {
        Timestamp: new Date().getTime(),
        CloudWatchMetrics: [
          {
            Namespace: "dev-demo-app",
            Dimensions: [["service"]],
            Metrics: [{ Name: eventName, Unit: "Count" }],
          },
        ],
      },
      service: "accounts",
      [eventName]: count,
      name: name,
      id: id,
    })
  );
};

const lambdaHandler = async (event) => {
  const _event = event as Schema;
  const {
    detail: { name, entityId },
  } = _event;
  console.log({ _event });
  if(name.startsWith('Error')) {
    logCloudwatchMetricRecord("failed", 1, name, entityId)
  }
  else {
    logCloudwatchMetricRecord("success", 1, name, entityId)
  }
};

export const handler = middy(lambdaHandler);

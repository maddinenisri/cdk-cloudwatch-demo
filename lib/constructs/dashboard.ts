import { Duration } from "aws-cdk-lib";
import * as cw from "aws-cdk-lib/aws-cloudwatch";
import { Construct } from "constructs";

type DashboardProps = {
  dashboardName: string;
};

export class Dashboard extends cw.Dashboard {
  constructor(scope: Construct, id: string, props: DashboardProps) {
    super(scope, id, {
      dashboardName: props.dashboardName,
    });
  }

  addTitleWidget(header: string) {
    this.addWidgets(
      new cw.TextWidget({ markdown: `#${header}`, width: 24, height: 1 })
    );
    return this;
  }

  addCountWidget() {
    const countWidget = new cw.SingleValueWidget({
      width: 24,
      title: "Counts",
      metrics: [
        new cw.Metric({
          metricName: "ErrorMetric",
          namespace: "AWS/ApiGateway",
          dimensionsMap: { ApiName: "apiName" },
          statistic: "sum",
          label: "Errored",
          period: Duration.hours(3),
        }),
        new cw.Metric({
          metricName: "SuccessMetric",
          namespace: "AWS/ApiGateway",
          dimensionsMap: { ApiName: "apiName" },
          statistic: "sum",
          label: "Processed",
          period: Duration.hours(3),
        }),
      ],
    });
    this.addWidgets(countWidget);
    return this;
  }

  addLogQueryWidget() {
    this.addWidgets(
      new cw.LogQueryWidget({
        logGroupNames: ["my-log-group"],
        view: cw.LogQueryVisualizationType.TABLE,
        // The lines will be automatically combined using '\n|'.
        queryLines: ["fields @message", "filter @message like /Error/"],
      })
    );
    return this;
  }
}

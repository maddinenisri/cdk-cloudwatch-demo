import { Dashboard } from "@constructs/dashboard";
import { CreateAccountFunction } from "@constructs/functions/eventAccount";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

type MetricsDemoStackProps = cdk.StackProps & {
  stageName: string;
};

export class MetricsDemoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: MetricsDemoStackProps) {
    const { stageName, ...stackProps } = props;
    super(scope, id, stackProps);
    new CreateAccountFunction(this, "CreateAccount", {stageName});
    new Dashboard(this, "dev-dashboard", { dashboardName: "DevDashboard" })
      .addTitleWidget("Sample Dashboard")
      .addCountWidget()
      .addLogQueryWidget();
  }
}

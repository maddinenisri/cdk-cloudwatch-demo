import { Duration, aws_lambda, type aws_lambda_nodejs, aws_logs } from "aws-cdk-lib";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { get } from 'env-var';
import { join } from 'path';

const nodePath = get('NODE_PATH').required().asString();

export const nodejsFunctionProps: aws_lambda_nodejs.NodejsFunctionProps = {
  architecture: aws_lambda.Architecture.ARM_64,
  runtime: Runtime.NODEJS_16_X,
  memorySize: 1024,
  tracing: aws_lambda.Tracing.ACTIVE,
  timeout: Duration.seconds(5),
  reservedConcurrentExecutions: 2,
  logRetention: aws_logs.RetentionDays.ONE_WEEK,
  insightsVersion: aws_lambda.LambdaInsightsVersion.VERSION_1_0_135_0,
  depsLockFilePath: join(nodePath, 'functions/package-lock.json'),
  bundling: {
    externalModules: [
      'aws-sdk'
    ]
  }
}
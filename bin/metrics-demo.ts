#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MetricsDemoStack } from '../lib/metrics-demo-stack';

const app = new cdk.App();
new MetricsDemoStack(app, 'MetricsDemoStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
  stageName: 'dev'
});
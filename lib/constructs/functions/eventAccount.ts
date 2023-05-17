import { aws_lambda_nodejs } from "aws-cdk-lib";
import { type Construct } from "constructs";

import { nodejsFunctionProps } from "./base";
import createAccount from "@lambda-handlers/createAccount";

type CreateAccountProps = {
  stageName: string
}

export class CreateAccountFunction extends aws_lambda_nodejs.NodejsFunction {
  constructor(scope: Construct, id: string, props: CreateAccountProps) {
    const { entry } = createAccount;

    super(scope, `${props.stageName}-${id}`, {
      ...nodejsFunctionProps,
      entry,
    });
  }
}

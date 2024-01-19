export type AmplifyDependentResourcesAttributes = {
  "analytics": {
    "olgaAnalytics": {
      "Id": "string",
      "Region": "string",
      "appName": "string"
    }
  },
  "auth": {
    "olgaAuth": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    }
  },
  "function": {
    "olgaAuthCreateAuthChallenge": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "olgaAuthDefineAuthChallenge": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "olgaAuthVerifyAuthChallengeResponse": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  },
  "storage": {
    "olgaStorage": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}
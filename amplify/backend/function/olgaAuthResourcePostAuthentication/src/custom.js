const AWS = require('aws-sdk');
AWS.config.update({region:'sa-east-1'});
const lambda = new AWS.Lambda();


/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event, context) => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  // Verificar si email_verified es false
  const emailVerified = event.request.userAttributes['email_verified'] === 'True';
  if (emailVerified) {
    console.log('Email is already verified. No action needed.');
    return event;
  }

  // Determinar el stage basado en el User Pool ID
  const userPoolId = event.userPoolId;
  let stage;
  switch (userPoolId) {
    case 'us-east-1_7Npn25c8F':
      stage = 'dev';
      break;
    case 'us-east-1_XL73TDAKs':
      stage = 'prod';
      break;
    default:
      console.error('Unknown User Pool ID:', userPoolId);
      return event;
  }

  // Construir el nombre de la función Lambda a invocar
  const lambdaName = `olga-backend-${stage}-go-lambda-post-confirmation`;
  const params = {
    FunctionName: lambdaName,
    InvocationType: 'RequestResponse', 
    Payload: JSON.stringify({
      company_id: event.request.userAttributes['name'],
      email: event.request.userAttributes['email'],
      username: event.userName,
    })
  };

  console.log("Sending payload", params.Payload)

  try {
    const response = await lambda.invoke(params).promise();
    console.log('Lambda invocation response:', response);
    return response;
  } catch (error) {
    console.error('Error invoking Lambda:', error);
    throw error;
  }
};

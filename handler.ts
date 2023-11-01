import AWS from 'aws-sdk';

module.exports.handler = async (event: any, context: any) => {
  const credentials = new AWS.Credentials(
    process.env.AWS_KEY || '',
    process.env.AWS_SECRET_KEY || '',
  );

  const sqs = new AWS.SQS({ region: 'us-east-1', credentials });
  const accountId = context.invokedFunctionArn.split(':')[4];
  const queueUrl =
    'https://sqs.us-east-1.amazonaws.com/' + accountId + '/lambda-queue';

  const messageBody = 'Lambda SQS Test';

  const params = {
    MessageBody: messageBody,
    QueueUrl: queueUrl,
  };

  try {
    const response = await sqs.sendMessage({ ...params }).promise();
    return {
      statusCode: 200,
      body: 'Mensagem enviada para a fila SQS.',
    };
  } catch (error) {
    console.error('Erro SQS:', error);
    throw error;
  }
};

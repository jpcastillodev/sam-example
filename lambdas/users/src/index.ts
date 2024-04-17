import awsServerlessExpress from "aws-serverless-express"
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import app from "./app"

const server = awsServerlessExpress.createServer(app);

function handler(event: APIGatewayProxyEvent, context: Context) {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
}
export { handler}
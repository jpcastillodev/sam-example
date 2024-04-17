import awsServerlessExpress from "aws-serverless-express"
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import routes from "./routes"

const server = awsServerlessExpress.createServer(routes);

function handler(event: APIGatewayProxyEvent, context: Context) {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
}
export { handler}
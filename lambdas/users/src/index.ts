import awsServerlessExpress from "aws-serverless-express"
import { APIGatewayProxyEvent, Context } from "aws-lambda";

import app from "./app"

/**
 * @type {import('http').Server}
 */
const server = awsServerlessExpress.createServer(app);

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

//hola
function handler(event: APIGatewayProxyEvent, context: Context) {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
}
export { handler}
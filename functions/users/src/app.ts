import express from 'express';
import bodyParser from 'body-parser';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';

// declare a new express app
const app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())


app.get('', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});

app.post('/*', function(req, res) {
  // Add your code here
  res.json({success: 'get call succeed!', url: req.url});
});



app.listen(3000, function() {
    console.log("User module started")
});


export default app

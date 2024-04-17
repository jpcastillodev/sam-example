import express from 'express';
import bodyParser from 'body-parser';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';

// declare a new express app
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(awsServerlessExpressMiddleware.eventContext())

app.get('/', (_req, res) => {

  const users = [
    { name: 'John Doe' },
    { name: 'Jane Doe' },
  ]

  res.status(200)
  res.json({ users: users })
  res.end()
})

app.get("/:id", (req, res) => {

  const id = req.params.id

  res.status(200)
  res.json({ id: id })
  res.end()

})


export default app

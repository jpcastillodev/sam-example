import express, {Router} from 'express';
import bodyParser from 'body-parser';
import awsServerlessExpressMiddleware from 'aws-serverless-express/middleware';

// declare a new express app
const app = express()
const router = Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(awsServerlessExpressMiddleware.eventContext())

router.get('/', (_req, res) => {

  const users = [
    { name: 'John Doe' },
    { name: 'Jane Doe' },
  ]

  res.status(200)
  res.json({ users: users })
  res.end()
})

router.get("/:id", (req, res) => {

  const id = req.params.id

  res.status(200)
  res.json({ id: id })
  res.end()

})



app.use('/users', router)
export default app

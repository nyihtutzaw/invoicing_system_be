import cors from 'cors'
import express from 'express'
import routes from './routes'
let application
const App = function () {
  if (!application) {
    // setting up the env variables

    application = express()

    // disabling the flag for security purposes
    application.disable('x-powered-by')

    // middlewares
    application.use(express.json())
    application.use(cors())

    // initialize the routes
    routes(application)
  }

  return application
}

export default App()

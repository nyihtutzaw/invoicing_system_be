import { Router } from 'express'
import RateLimit from 'express-rate-limit'
import PublicRoutes from './public'

export default (app) => {
  const routes = Router()
  const apiLimiter = new RateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100,
    message:
      'Too many requests from this IP, please try again after 10 minutes.',
  })

  PublicRoutes(routes)

  app.use('/api/', [apiLimiter, routes])
}

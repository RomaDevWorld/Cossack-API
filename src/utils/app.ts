import express from 'express'
import router from '../routes/router'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import './strategy'
import MongoStore from 'connect-mongo'
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: process.env.RATE_LIMIT_TIME ? parseInt(process.env.RATE_LIMIT_TIME) : 5000,
  max: process.env.RATE_LIMIT_MAX ? parseInt(process.env.RATE_LIMIT_MAX) : 5,
  message: 'You are being rate limited',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

export const createApp = (): express.Express => {
  const app = express()
  app.disable('x-powered-by')

  //cors
  app.use(
    cors({
      origin: [`http://localhost:${process.env.PORT}`, process.env.FRONTEND_URL as string],
      credentials: true,
    })
  )

  //middlewares
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(limiter)

  //session
  app.use(
    session({
      secret: process.env.SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 60 * 24 * 7 },
      store: MongoStore.create({ mongoUrl: process.env.MONGOURL }),
    })
  )

  //passport
  app.use(passport.initialize())
  app.use(passport.session())

  // //delay
  // app.use((req, res, next) => setTimeout(() => next(), 500))

  //global route
  app.use((process.env.ROUTE as string) || '/', router)

  return app
}

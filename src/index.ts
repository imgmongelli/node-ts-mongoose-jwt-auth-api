import mongoose from 'mongoose'
import express, { type Request, type Response, type NextFunction } from 'express'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import http from 'http'

import authRoute from '@routes/auth'
import userRoute from '@routes/api'
import morgan from 'morgan'
import Exception from '@exceptions/baseException'

const baseUrl = '/api/v1'
const app = express()

// check if env variables are set
console.log(process.env.NODE_ENV)

const connectionDb = async (): Promise<void> => {
  const dbConnection = process.env.DB_CONNECTION ?? undefined

  if (dbConnection === undefined) {
    throw new Error('DB_CONNECTION environment variable is not defined.')
  }
  await mongoose.connect(dbConnection)
  mongoose.connection.on('error', (error: Error) => {
    console.log(error)
    process.exit(1)
  })
  console.log('DB CONNECTED')
}

const registerRoutes = (): void => {
  // mounting the router
  app.use(`${baseUrl}/auth`, authRoute)
  app.use(`${baseUrl}/api`, userRoute)
  console.log('ROUTES REGISTERED')
}

const errorHanlder = (): void => {
  app.all('*', (req, res, next) => {
    const err = new Exception(
      `Can't find this route: ${req.originalUrl}  on this server`,
      404
    )
    next(err)
  })
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Errore:', err.message)

    if (err instanceof Exception) {
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      })
    } else {
      res.status(500).json({ message: 'Si è verificato un errore interno.' })
    }
  })
}

const serverConfig = (): void => {
  if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('combined'))
  }
  app.use(morgan('dev'))
  app.use(express.json({ limit: '10mb' }))
  app.use(express.urlencoded({ limit: '10mb', extended: true }))

  app.use(cors({ credentials: true }))
  app.use(compression())
  app.use(cookieParser())
}

const startupServer = (): void => {
  const server = http.createServer(app)
  server.listen(process.env.API_PORT, () => {
    console.log(`Server running on port ${process.env.API_PORT}`)
  })
}

await connectionDb().then(() => {
  serverConfig()
  registerRoutes()
  errorHanlder()
  startupServer()
})

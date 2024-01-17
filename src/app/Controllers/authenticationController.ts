import type express from 'express'
import jwt from 'jsonwebtoken'
import { validationResult } from 'express-validator'
import { createUser, getUserByEmail } from '@services/userService'
import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { handleMongoError } from '@utils/helpers'

interface RegisterRequestBody {
  id: string
  password?: string
  firstname: string
  lastname: string
  email: string
}

interface LoginRequestBody {
  email: string
  password: string

}

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req)

    const requestBody: RegisterRequestBody = req.body as RegisterRequestBody

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }

    const publicUUID = uuidv4()
    requestBody.id = publicUUID
    requestBody.password = await bcrypt.hash(String(requestBody.password), 10)

    await createUser(req.body as Record<string, any>)
    return res.status(200).json({ message: 'User created' })
  } catch (error) {
    console.log(error)
    const { status, message } = handleMongoError(error)
    return res.status(status).json({ message })
  }
}

export const login = async (req: express.Request, res: express.Response) => {
  try {
    // Sostituisci con una chiave segreta complessa
    const JWT_SECRET = process.env.JWT_SECRET ?? ''
    const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '1h' // Durata del token

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const requestBody: LoginRequestBody = req.body as LoginRequestBody

    const user: User | null = await getUserByEmail(String(requestBody.email))

    if (user === null) {
      return res.status(404).json({ message: 'User not found' })
    }

    const match = await bcrypt.compare(String(requestBody.password), user.password)

    if (match) {
      const payload = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        id: user.id
      }
      // Generazione del token
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

      return res.status(200).json({ data: { details: user, token } })
    } else {
      return res.status(200).json({ message: 'Credentials not correct' })
    }
  } catch (error) {
    console.log(error)
    const { status, message } = handleMongoError(error)
    return res.status(status).json({ message })
  }
}

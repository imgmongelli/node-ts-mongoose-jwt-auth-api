import type express from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET // chiave segreta

export const verifyJwtToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader: string | undefined = req.headers.authorization

  if (authHeader === undefined) {
    return res.status(401).json({ message: 'Access denied. No token provided.' })
  }

  const token = authHeader.split(' ')[1] // token nel formato 'Bearer TOKEN'

  try {
    const decoded = jwt.verify(token, JWT_SECRET ?? '') as jwt.JwtPayload
    const jwtUser: JwtUser = {
      firstname: decoded.firstname as string,
      lastname: decoded.lastname as string,
      email: decoded.email as string,
      id: decoded.id as string,
      exp: decoded.exp,
      iat: decoded.iat
    }

    req.userData = jwtUser
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token.' })
  }
}

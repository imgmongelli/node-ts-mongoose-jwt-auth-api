// create interface for jwtuser

interface JwtUser {
  firstname: string
  lastname: string
  email: string
  id: string
  exp?: number
  iat?: number
}

import express from 'express'
import { register, login } from '@controllers/authenticationController'
import { registerValidator } from '@middlewares/validators/registerValidator'

const router = express.Router()

// /api/auth/register with POST method will be handled by register function in authenticationController.ts and validated by registerValidator in registerValidator.ts
router.route('/register').post(registerValidator, register)
router.route('/login').post(login)

export default router

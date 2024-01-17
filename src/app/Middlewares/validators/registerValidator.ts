import { body } from 'express-validator'

export const registerValidator = [
  body('email').isEmail().withMessage('Invalid email format'),
  body('firstname').notEmpty().withMessage('Firstname is required'),
  body('lastname').notEmpty().withMessage('Lastname is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
]

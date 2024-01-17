import express from 'express'

import { verifyJwtToken } from '@middlewares/authMiddleware'
import { getUser } from '@controllers/userController'
const router = express.Router()

router.route('/me').get(verifyJwtToken, getUser)

export default router

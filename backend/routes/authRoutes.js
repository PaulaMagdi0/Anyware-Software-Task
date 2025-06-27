import express from 'express'
import { check } from 'express-validator'
import { login, register } from '../controllers/authController.js'

const router = express.Router()

router.post(
    '/login',
    [
        check('email', 'Valid email is required').isEmail(),
        check('password', 'Password is required').notEmpty(),
    ],
    login
)

router.post(
    '/register',
    [
        check('email', 'Valid email is required').isEmail(),
        check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    ],
    register
)

export default router

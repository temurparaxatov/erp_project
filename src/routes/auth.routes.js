import express from 'express'
import passport from 'passport'
import { getUserController,registerController ,loginController} from '../controllers/index.js'

export const authRouter = express.Router()

authRouter.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }),
)

authRouter.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/api/v1/auth/failure',
    }),
    (req, res) => {
        res.redirect('/api/v1/auth/success')
    },
)

authRouter.get('/success', (req, res) => {
    res.status(200).json({
        message: 'Authentication successful',
        user: req.user,
    })
})

authRouter.get('/failure', (req, res) => {
    res.status(401).json({ message: 'Authentication failed' })
})

authRouter.get("/profile/:id",getUserController)

authRouter.post('/register', registerController);
authRouter.post('/login', loginController);
authRouter.get('/user/:id', getUserController);

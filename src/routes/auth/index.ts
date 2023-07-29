import { Router } from 'express'
import passport from 'passport'
import isAuthenticated from '../../middlewares/isAuthenticated'
import getUserInfo from '../../controllers/auth/getUserInfo'

const router = Router()

router.get('/discord', passport.authenticate('discord'))

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) => {
  res.redirect(process.env.FRONTEND_URL + '/dashboard')
})

router.get('/user', isAuthenticated, getUserInfo)

export default router

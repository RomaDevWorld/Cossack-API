import { Router } from 'express'
import passport from 'passport'

const router = Router()

router.get('/discord', passport.authenticate('discord'))

router.get('/discord/redirect', passport.authenticate('discord'), (req, res) => {
  res.redirect(process.env.FRONTEND_URL + '/dashboard')
})

export default router

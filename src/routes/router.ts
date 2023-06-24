import { Router } from 'express'
import isAuthenticated from '../middlewares/isAuthenticated'

const router = Router()

import authRouter from './auth'
router.use('/auth', authRouter)

import guildRouter from './guilds'
router.use('/guilds', isAuthenticated, guildRouter)

export default router

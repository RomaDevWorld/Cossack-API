import { Router } from 'express'
import getGuilds from '../../controllers/guild/getGuilds'
import getOneGuild from '../../controllers/guild/getOneGuild'
import updateGuildModules from '../../controllers/guild/updateGuildModules'
import getGuildModules from '../../controllers/guild/getGuildModules'
import getGuildChannels from '../../controllers/guild/getGuildChannels'
import isGuildAdmin from '../../middlewares/isGuildAdmin'

const router = Router()

router.get('/', getGuilds)

router.get('/:id', getOneGuild)

router.get('/:id/channels', isGuildAdmin, getGuildChannels)

//Configuration
router.get('/:id/admin/modules/', isGuildAdmin, getGuildModules)

router.post('/:id/admin/modules/', isGuildAdmin, updateGuildModules)

export default router

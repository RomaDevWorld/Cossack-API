import { Router } from 'express'
import getGuilds from '../../controllers/guild/getGuilds'
import getOneGuild from '../../controllers/guild/getOneGuild'
import updateGuildModules from '../../controllers/guild/updateGuildModules'
import getGuildModules from '../../controllers/guild/getGuildModules'
import getGuildChannels from '../../controllers/guild/getGuildChannels'
import isGuildAdmin from '../../middlewares/isGuildAdmin'
import getGuildRoles from '../../controllers/guild/getGuildRoles'
import getGuildMembers from '../../controllers/guild/getGuildMembers'

const router = Router()

router.get('/', getGuilds)

router.get('/:id', isGuildAdmin, getOneGuild)

router.get('/:id/channels', isGuildAdmin, getGuildChannels)
router.get('/:id/roles', isGuildAdmin, getGuildRoles)
router.get('/:id/members', isGuildAdmin, getGuildMembers)

//Configuration
router.get('/:id/admin/modules/', isGuildAdmin, getGuildModules)

router.post('/:id/admin/modules/', isGuildAdmin, updateGuildModules)

export default router

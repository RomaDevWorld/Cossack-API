import { Router } from 'express'
import getGuilds from '../../controllers/guild/getGuilds'
import getOneGuild from '../../controllers/guild/getOneGuild'
import updateGuildModules from '../../controllers/guild/updateGuildModules'
import getGuildModules from '../../controllers/guild/getGuildModules'
import getGuildChannels from '../../controllers/guild/getGuildChannels'
import isGuildAdmin from '../../middlewares/isGuildAdmin'
import getGuildRoles from '../../controllers/guild/getGuildRoles'
import getGuildMembers from '../../controllers/guild/getGuildMembers'
import getGuildWarns from '../../controllers/guild/getGuildWarns'
import getGuildTickets from '../../controllers/guild/getGuildTickets'
import getGuildRanks from '../../controllers/guild/getGuildRanks'
import updateGuildTicket from '../../controllers/guild/updateGuildTicket'

const router = Router()

router.get('/', getGuilds)

router.get('/:id', isGuildAdmin, getOneGuild)

router.get('/:id/channels', isGuildAdmin, getGuildChannels)
router.get('/:id/roles', isGuildAdmin, getGuildRoles)
router.get('/:id/members', isGuildAdmin, getGuildMembers)

//Configuration
router.get('/:id/admin/modules/', isGuildAdmin, getGuildModules)
router.post('/:id/admin/modules/', isGuildAdmin, updateGuildModules)
//Tickets
router.get('/:id/admin/modules/tickets/', isGuildAdmin, getGuildTickets)
router.post('/:id/admin/modules/tickets/', isGuildAdmin, updateGuildTicket)
//Ranks
router.get('/:id/admin/modules/ranks/', isGuildAdmin, getGuildRanks)

//Warns
router.get('/:id/admin/warns/', isGuildAdmin, getGuildWarns)

export default router

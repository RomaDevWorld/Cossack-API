import { Request, Response } from 'express'
import Tickets from '../../schemas/Modules.Tickets'

export default async function (req: Request, res: Response) {
  const { id: guildId, ticketId } = req.params
  const body = req.body

  try {
    const ticket = await Tickets.findById(ticketId)
    if (!ticket) return res.sendStatus(404)
    if (ticket.guildId !== guildId) return res.sendStatus(403)

    await Tickets.findByIdAndUpdate(ticketId, {
      categoryId: body.categoryId,
      prefix: body.prefix,
      allowedRoles: Array.from(body.allowedRoles),
    })
    return res.sendStatus(200)
  } catch (err) {
    console.error(err)
    return res.sendStatus(400)
  }
}

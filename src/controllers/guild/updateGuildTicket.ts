import { Request, Response } from 'express'
import Tickets from '../../schemas/Modules.Tickets'

export default async function (req: Request, res: Response) {
  const { id: guildId } = req.params
  const body = req.body

  try {
    await Tickets.findOneAndUpdate(
      { guildId, messageId: body.messageId },
      { categoryId: body.categoryId, prefix: body.prefix, allowedRoles: body.allowedRoles || [] },
      { upsert: true, new: true }
    )
    return res.sendStatus(200)
  } catch (err) {
    return res.sendStatus(400)
  }
}

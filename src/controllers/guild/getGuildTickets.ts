import { Request, Response } from 'express'
import ModulesTickets from '../../schemas/Modules.Tickets'

export default async function (req: Request, res: Response) {
  try {
    const { id: guildId } = req.params
    const data = await ModulesTickets.find({
      guildId,
    })

    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

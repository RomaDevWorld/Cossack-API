import { Request, Response } from 'express'
import ModulesRanking from '../../schemas/Modules.Ranking'

export default async function (req: Request, res: Response) {
  try {
    const { id: guildId } = req.params
    const data = await ModulesRanking.find({
      guildId,
    })

    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

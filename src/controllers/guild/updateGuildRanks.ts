import { Request, Response } from 'express'
import ModulesRanking from '../../schemas/Modules.Ranking'

export default async function (req: Request, res: Response) {
  const { id: guildId } = req.params
  const body = req.body

  if (!body.lvl || !body.roleId) return res.sendStatus(400)

  try {
    await ModulesRanking.findOneAndUpdate(
      { guildId, roleId: body.roleId },
      { lvl: body.lvl },
      { upsert: true }
    )
    return res.sendStatus(200)
  } catch (err) {
    return res.sendStatus(400)
  }
}

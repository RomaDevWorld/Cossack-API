import { Request, Response } from 'express'
import Modules from '../../schemas/Modules'

export default async function (req: Request, res: Response) {
  const { id: guildId } = req.params
  const modules: typeof Modules = req.body

  try {
    await Modules.findOneAndUpdate({ guildId }, { $set: modules }, { upsert: true })
    return res.sendStatus(200)
  } catch (err) {
    return res.sendStatus(400)
  }
}

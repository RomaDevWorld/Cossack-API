import { Request, Response } from 'express'
import Modules from '../../schemas/Modules'

export default async function (req: Request, res: Response) {
  const { id: guildId } = req.params
  const modules: typeof Modules = req.body

  const data = await Modules.findOneAndUpdate(
    { guildId },
    { $set: modules },
    { upsert: true, new: true }
  )

  return res.status(200).json(data)
}

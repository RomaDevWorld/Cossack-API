import { Request, Response } from 'express'
import Modules from '../../schemas/Modules'

export default async function (req: Request, res: Response) {
  const { id: guildId } = req.params
  const modules: typeof Modules = req.body

  console.log(req.body)

  await Modules.findOneAndUpdate({ guildId }, modules, { upsert: true })

  return res.sendStatus(200)
}

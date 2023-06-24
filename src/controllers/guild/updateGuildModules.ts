import { Request, Response } from 'express'
import Logchannel from '../../schemas/Modules'
import { ModulesI } from '../../../types'

export default async function (req: Request, res: Response) {
  const { id: guildId } = req.params
  const modules: ModulesI = req.body

  console.log(req.body)

  await Logchannel.findOneAndUpdate({ guildId }, modules, { new: true, upsert: true })

  return res.sendStatus(200)
}

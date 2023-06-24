import { Request, Response } from 'express'
import guildModules from '../../schemas/Modules'
import { ModulesI } from '../../../types'

export default async function (req: Request, res: Response) {
  try {
    const { id: guildId } = req.params
    const dbValue = await guildModules.findOne<ModulesI>({ guildId })

    res.status(200).json(dbValue)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

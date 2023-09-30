import { Request, Response } from 'express'
import guildModules from '../../schemas/Modules'

export default async function (req: Request, res: Response) {
  try {
    const { id: guildId } = req.params
    const data = await guildModules.findOneAndUpdate(
      { guildId },
      { guildId },
      { new: true, upsert: true }
    )

    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

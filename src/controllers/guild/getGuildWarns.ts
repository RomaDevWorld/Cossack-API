import { Request, Response } from 'express'
import Warns from '../../schemas/Warns'

export default async function (req: Request, res: Response) {
  try {
    const { id: guildId } = req.params
    const data = await Warns.find({
      guildId,
    })

    res.status(200).json(data)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

import { Request, Response } from 'express'
import client from '../../utils/client'

export default async function (req: Request, res: Response) {
  try {
    const { id } = req.params
    const guild = await client.guilds.fetch(id)

    return res.status(200).json(guild)
  } catch (err) {
    res.status(500)
  }
}

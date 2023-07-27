import { Request, Response } from 'express'
import client from '../../utils/client'

export default async function (req: Request, res: Response) {
  try {
    const { id } = req.params
    const guild = await client.guilds.fetch(id)
    const members = await guild.members.fetch()

    return res.status(200).json(members)
  } catch (err) {
    console.error(err)
    res.status(500)
  }
}

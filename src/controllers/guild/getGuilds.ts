import { UserI } from '../../schemas/User'
import { getMutualGuildsService } from '../../services/guild/getMutualGuilds'
import { Request, Response } from 'express'

export default async function (req: Request, res: Response) {
  const user = req.user as UserI
  try {
    const guilds = await getMutualGuildsService(user.id)
    res.send(guilds)
  } catch (err) {
    console.error(err)
    res.status(500)
  }
}

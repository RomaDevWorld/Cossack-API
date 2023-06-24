import { NextFunction, Request, Response } from 'express'
import { UserI } from '../schemas/User'
import { PermissionsBitField } from 'discord.js'
import client from '../utils/client'

const isGuildAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as UserI
  if (!user) return res.sendStatus(401)

  const guild = client.guilds.cache.get(req.params.id)
  if (!guild) return res.sendStatus(404)

  const member = await guild.members.fetch(user.discordId)
  if (!member || !member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return res.sendStatus(403)

  next()
}

export default isGuildAdmin

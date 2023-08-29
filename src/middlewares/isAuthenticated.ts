import { NextFunction, Request, Response } from 'express'
import { UserI } from '../schemas/User'

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) return res.sendStatus(401)

  const user = req.user as UserI

  try {
    const response = await fetch('https://discord.com/api/v10/users/@me', {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })

    response.ok
      ? next()
      : res.status(403).json({ message: `Error from Discord API: ${response.statusText}` })
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
}

export default isAuthenticated

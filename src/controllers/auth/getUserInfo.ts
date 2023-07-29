import { Request, Response } from 'express'
import { getUserInfoService } from '../../services/auth/getUserInfoService'
import { UserI } from '../../schemas/User'

export default async function (req: Request, res: Response) {
  const user = req.user as UserI

  const status = await getUserInfoService(user.id)

  status.data ? res.status(200).json(status.data) : res.status(401)
}

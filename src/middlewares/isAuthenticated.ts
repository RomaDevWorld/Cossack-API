import { NextFunction, Request, Response } from 'express'

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  req.user ? next() : res.sendStatus(401)
}

export default isAuthenticated

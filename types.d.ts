import { UserI } from './src/schemas/User'

export type PartialGuild = {
  id: string
  name: string
  icon: string
  owner: boolean
  permissions: string
  features: string[]
}

declare global {
  namespace Express {
    type User = UserI
  }
}

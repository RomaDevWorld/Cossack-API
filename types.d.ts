export type PartialGuild = {
  id: string
  name: string
  icon: string
  owner: boolean
  permissions: string
  features: string[]
}

export interface ModulesI {
  guildId: string
  logChannel: string
  owner: string
  lobby: {
    channel: string
    category: string
  }
}

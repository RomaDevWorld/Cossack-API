import client from '../../utils/client'
export function getBotGuildsService() {
  return client.guilds.cache
}

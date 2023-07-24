import 'dotenv/config'
if (
  !process.env.MONGOURL ||
  !process.env.FRONTEND_URL ||
  !process.env.DISCORD_TOKEN ||
  !process.env.DISCORD_CLIENT_ID ||
  !process.env.DISCORD_REDIRECT
)
  throw new Error('Missing one or more .env variables')

import { createApp } from './utils/app'
import client from './utils/client'
import './utils/mongodb'

const PORT = process.env.PORT || 3000

try {
  const app = createApp()
  app.listen(PORT, () => {
    console.log(`Express is running on http://localhost:${PORT}`)
  })
} catch (err) {
  console.error(err)
}

try {
  client.login(process.env.DISCORD_TOKEN)
  client.once('ready', (client) => {
    console.log(`Websocket connected: ${client.user.tag}`)
  })
} catch (err) {
  console.error(err)
}

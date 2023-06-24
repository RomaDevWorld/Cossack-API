import 'dotenv/config'
import { createApp } from './utils/app'
import client from './utils/client'
import './utils/db'

if (!process.env.DB_HOST || !process.env.DB_NAME || !process.env.FRONTEND_URL || !process.env.DISCORD_TOKEN) {
  console.log(process.env)
  throw new Error('Missing env variables')
}

const main = () => {
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
}

main()

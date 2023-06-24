import { Client, GatewayIntentBits, Collection } from "discord.js"

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
] })

export default client;
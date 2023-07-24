import axios from "axios"
import { PartialGuild } from "../../../types"
import User from "../../schemas/User"

export async function getUserGuildsService(id: string) {
  const user = await User.findById(id)
  if(!user) throw new Error("User not found")

  return axios.get<PartialGuild[]>('https://discord.com/api/v10/users/@me/guilds', {
    headers: {
      Authorization: `Bearer ${user.accessToken}`
    }
  })
}
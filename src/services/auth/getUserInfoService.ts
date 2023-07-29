import axios from 'axios'
import User from '../../schemas/User'

export async function getUserInfoService(id: string) {
  const user = await User.findById(id)
  if (!user) throw new Error('User not found')

  return axios.get('https://discord.com/api/v10/users/@me', {
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  })
}

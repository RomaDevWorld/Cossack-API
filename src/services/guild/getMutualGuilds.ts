import { getBotGuildsService } from "./getBotGuilds";
import { getUserGuildsService } from "./getUserGuilds";

export async function getMutualGuildsService(id: string) {
    const { data: userGuilds } = await getUserGuildsService(id);
    const botGuilds = await getBotGuildsService();

    const adminUserGuilds = userGuilds.filter(userGuilds => (parseInt(userGuilds.permissions) & 0x8) === 0x8)

    const mutualGuilds = adminUserGuilds.filter(adminUserGuilds => botGuilds.some(botGuilds => botGuilds.id === adminUserGuilds.id))

    return mutualGuilds;

}
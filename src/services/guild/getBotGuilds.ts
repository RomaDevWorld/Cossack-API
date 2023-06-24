import client from "../../utils/client";
export async function getBotGuildsService() {
    return await client.guilds.fetch();
}
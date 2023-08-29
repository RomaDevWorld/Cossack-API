# Cossack-API

Backend Node.js application built with typescript for communicating between user, MongoDB and Discord API, managing authorization with discord passport

**This application is still under development. Stay tuned for new updates!**

## Folder structure explanation

```
.env.example – Example file for environment variables required to run the app
types.d.ts - Typescript type declarations
src/
├── index.ts – File to start the app
├── utils/
│   ├── app.ts – Create express app
│   ├── client.ts – Connect to discord web socket
│   ├── mongodb.ts – Connect to MongoDB
│   └── strategy.ts – Discord authorization strategy
├── services/ – Useful reusable services
│   └── guilds/
│       ├── getUserGuilds.ts
│       └── getBotGuilds.ts
├── schemas/ – Mongoose schemas
├── routes/
│   ├── router.ts – Index router endpoint
│   ├── guilds/
│   └── auth/
├── middlewares/
│   ├── isAuthenticated.ts
│   └── isGuildAdmin.ts
└── controllers/ – Code that is being called in routes
    └── guild/
```

## Router endpoints explanation

`GET: /` - global router (can be configured inside `/src/utils/app.ts`)

`GET: /auth/discord` - will execute the discord authentication passport and redirect to the bot authorization page.

`GET: /auth/redirect` - auth redirect URL, that user will be redirected to after authorizing the bot

`GET: /auth/user` - return information about current logged user

`GET: /guilds/` - if the user is authorized, it will return a JSON object with all the user's guilds.

`GET: /guilds/[guildId]` - will return a JSON object with general information about the given guild.

`GET: /guilds/[guildId]/channel` - will return a JSON object with all the channels in a given guild.

`GET: /guilds/[guildId]/roles` - will return a JSON object with all the roles in a given guild.

`GET: /guilds/[guildId]/members` - will return a JSON object with all the members in a given guild.

`GET: /guilds/[guildId]/admin/modules` - will query the database for guild modules `(/src/schemas/Modules.ts)` and return a JSON object with the result.

`POST: /guilds/[guildId]/admin/modules` - takes a data `(mongoose update query e.g { log.channel: 101010101010101 })`, updates the values in the database, and returns a JSON object with updated values.

## Understanding env variables

`PORT` - Port on what application will run

`FRONTEND_URL` - Publicly accessible url to Frontend UI (After the authorization it will redirect the user to it)

`MONGOURL` - Full MongoDB connection string (starts with `mongodb://`)

`SECRET` - String used to encrypt user's sessions (Create some with `openssl rand -base64 32` or just type random characters)

`RATE_LIMIT_TIME` - Window of time in which user can make the requests

`RATE_LIMIT_MAX` - Max requests per window time

**Next variables requires discord bot application. You can create one here: https://discord.com/developers/applications**

`DISCORD_TOKEN` - Discord application token from (Bot tab)

`DISCORD_CLIENT_ID` - Discord application ID (OAuth2 tab)

`DISCORD_CLIENT_SECRET` - Discord application secret (OAuth2 tab)

`DISCORD_REDIRECT` - Authorization redirect URL (Have to be configured in OAuth2 tab, should look something like `http://localhost:3000/auth/discord/redirect`)

## How to run?

### Locally with NodeJS

<ol>
  <li>
    <a href="https://nodejs.org/en">Install NodeJS runtime</a>
  </li>
  <li>
    <a>Install Yarn <code>npm i -g yarn</code></a>
  </li>
  <li>
    <a href="https://git-scm.com/">Install Git</a>
  </li>
  <li>
    Clone source code with <code>git clone git@github.com:RomaDevWorld/Cossack-API.git</code> or however you like it
  </li>
  <li>
    Open cloned directory in terminal, and run <code>yarn install</code> to install the dependencies 
  </li>
  <li>
    Create <code>.env</code> file and specify all the necessary values (Mentioned previously)
  </li>
  <li>
    Build source code with <code>yarn build</code>
  </li>
  <li>
    Run the app <code>yarn start</code>
  </li>
</ol>

### Using Docker

<ol>
  <li>Install <a href="https://docs.docker.com/engine/install/">Docker engine</a> on your system</li>
  <li>
    Run command below after specifying with all the env variables <code>-e</code> (Mentioned previously):
  </li>
</ol>

```
sudo docker run \
--name api \
--restart unless-stopped \
-p 80:3000 \
-e DISCORD_TOKEN='Your discord bot token' \
-e DISCORD_CLIENT_ID='Your discord bot client id' \
-e DISCORD_CLIENT_SECRET="Discord application client secret" \
-e DISCORD_REDIRECT="Auth redirect url" \
-e SECRET="String for encryption" \
-e FRONTEND_URL="URL to frontend UI" \
-e MONGOURL="MongoDB connection string" \
romadevworld/cossackapi:latest
```

# Cossack-API
Backend Node.js application built with typescript for communicating between user, MongoDB and Discord API, managing authorization with discord passport 

**This application is still under develompent. Stay tuned for new updates!**
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

## Understanding env variables

`PORT` - Port on what application will run

`FRONTEND_URL` - Publicly accessible url to Frontend UI (After the authorization it will redirect the user to it)

`MONGOURL` - Full MongoDB connection string (starts with `mongodb://`)

`SECRET` - String used to encrypt user's sessions (Create some with `openssl rand -base64 32` or just type random characters)

**Next variables requires discord bot application. You can create one here: https://discord.com/developers/applications**

`DISCORD_TOKEN` - Discord application token from (Bot tab)

`DISCORD_CLIENT_ID` - Discord application ID (OAuth2 tab)

`DISCORD_CLIENT_SECRET` - Discord application secret (OAuth2 tab)

`DISCORD_REDIRECT` - Authorization redirect URL (Have to be configured in OAuth2 tab, schould look something like `http://localhost:3000/auth/discord/redirect`)

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
    Run command below after spicifying with all the env variables <code>-e</code> (Mentioned previously):
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
-e SECRET="String for encription" \
-e FRONTEND_URL="URL to frontend UI" \
-e MONGOURL="MongoDB connection string" \
romadevworld/cossackapi:latest
```

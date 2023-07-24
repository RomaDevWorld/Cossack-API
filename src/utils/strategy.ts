import { Strategy, Profile } from 'passport-discord'
import passport from 'passport'
import { VerifyCallback } from 'passport-oauth2'
import User, { UserI } from '../schemas/User'

import { config } from 'dotenv'
config()

passport.serializeUser((user: unknown, done) => {
  done(null, (user as UserI).id)
})

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id)
    return user ? done(null, user as UserI) : done(null, false)
  } catch (err) {
    console.error(err)
    return done(err, false)
  }
})

passport.use(
  new Strategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      callbackURL: process.env.DISCORD_CALLBACK as string,
      scope: ['identify', 'guilds'],
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
      try {
        const user = await User.findOneAndUpdate(
          { discordId: profile.id },
          { accessToken, refreshToken },
          { new: true, upsert: true }
        )
        return done(null, user as UserI)
      } catch (err) {
        console.error(err)
        return done(err as Error, undefined)
      }
    }
  )
)

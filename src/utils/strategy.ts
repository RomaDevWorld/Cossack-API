import { Strategy, Profile } from 'passport-discord'
import passport from 'passport'
import { VerifyCallback } from 'passport-oauth2'
import User from '../schemas/User'

import { config } from 'dotenv'
config()

passport.serializeUser((user: any, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id)
    return user ? done(null, user) : done(null, false)
  } catch (err) {
    console.error(err)
    return done(err, false)
  }
})

passport.use(
  new Strategy(
    {
      clientID: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      callbackURL: process.env.DISCORD_CALLBACK!,
      scope: ['identify', 'guilds'],
    },
    async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
      try {
        const user = await User.findOneAndUpdate({ discordId: profile.id }, { accessToken, refreshToken }, { new: true, upsert: true })
        return done(null, user)
      } catch (err) {
        console.error(err)
        return done(err as any, false)
      }
    }
  )
)

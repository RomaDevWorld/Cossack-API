import mongoose from 'mongoose'
import { config } from 'dotenv'
config()

mongoose
  .connect(process.env.MONGOURL as string)
  .then(() => console.log(`[MongoDB] Connected to ${process.env.DB_HOST}@${process.env.DB_NAME}`))
  .catch((err) => console.error(err))
export default mongoose

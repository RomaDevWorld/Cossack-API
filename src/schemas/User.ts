import { SchemaTypes, Schema, model } from 'mongoose'

export interface UserI {
  id: string
  discordId: string
  accessToken: string
  refreshToken: string
}

const UserSchema = new Schema({
  discordId: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
  },
  accessToken: {
    type: SchemaTypes.String,
    required: true,
  },
  refreshToken: {
    type: SchemaTypes.String,
    required: true,
  },
})

export default model('users', UserSchema)

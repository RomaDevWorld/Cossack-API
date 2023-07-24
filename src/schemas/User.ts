import { SchemaTypes, Schema, model } from 'mongoose'

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

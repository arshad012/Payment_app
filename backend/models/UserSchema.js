import { Schema, model } from 'mongoose'
import { userRollSchema } from '../utils/index.js'

export const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    school_id: {
        type: String,
    }
})

export const User = model('User', UserSchema);
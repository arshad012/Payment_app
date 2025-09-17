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
    role: {
        type: String,
        enum: Object.values(userRollSchema),
        default: userRollSchema.SCHOOL
    },
    school_id: {
        type: String,
        // type: Schema.Types.ObjectId,
        // ref: 'School'
    }
})


export const User = model('User', UserSchema);
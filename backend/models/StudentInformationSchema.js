import { Schema } from 'mongoose'

export const StudentInformationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
})
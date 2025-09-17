import { Schema, model } from "mongoose";

const TokenModel = new Schema({
    userId: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});

export const Token = new model('Token', TokenModel);
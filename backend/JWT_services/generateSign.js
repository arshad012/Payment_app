import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const pg_key = process.env.PG_KEY;

export const generateSign = async (payload) => {
    return jwt.sign(payload, pg_key, { algorithm: "HS256" });
}
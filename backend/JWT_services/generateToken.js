import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const secret_key = process.env.SECRET_KEY;

export const generateToken = (user) => {
    return jwt.sign(
        { userId: user._id.toString() },
        secret_key,
        { expiresIn: "1h" }
    );
}
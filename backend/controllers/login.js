import bcrypt from 'bcrypt';
import { User, Token } from '../models/index.js';
import { config } from 'dotenv';
import { generateToken } from '../JWT_services/index.js';

config();
const secret_key = process.env.SECRET_KEY;

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: 'Wrong password'
            })
        }

        const token = generateToken(user);
        await upsertTokenForUser(user, token);

        
        return res.status(200).json({
            message: 'Login successful',
            token: token,
            user
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
}

const upsertTokenForUser = async (user, token) => {
    const tokenInstance = await Token.findOne({ userId: user._id });
    if (tokenInstance) {
        await tokenInstance.deleteOne();
    }

    const newToken = Token({
        userId: user._id,
        token
    })

    await newToken.save();
}
import jwt from 'jsonwebtoken';
import { Token } from '../models/index.js';
import { config } from 'dotenv'
const { TokenExpiredError } = jwt;

config();
const SECRET_KEY = process.env.SECRET_KEY;

export async function authenticateMiddleware(req, res, next) {

    try {
        const tokenWithBearer = req.headers.authorization;
        if (!tokenWithBearer) {
            return res.status(401).json({
                message: 'No token found'
            })
        }

        let token = tokenWithBearer;
        if (tokenWithBearer.startsWith("Bearer ")) {
            token = tokenWithBearer.slice(7, tokenWithBearer.length).trim();
        }
        
        const claims = jwt.verify(token, SECRET_KEY);
        const tokenInstance = await Token.findOne({ userId: claims.userId });

        if (!tokenInstance) {
            return res.status(401).json({
                message: 'Invalid user, please login again ! code1'
            });
        }
        if (tokenInstance.token !== token) {
            return res.status(401).json({
                message: 'Invalid user, please login again ! code2'
            });
        }

        req.userId = claims.userId;
        next();

    } catch (error) {
        if (error instanceof TokenExpiredError) {
            return res.status(401).json({
                message: 'Login expired, please login again.'
            })
        }

        return res.status(401).json({
            message: 'Authentication failed'
        });
    }
}
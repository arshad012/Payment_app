import bcrypt from 'bcrypt';
import { User, Token } from "../models/index.js";
import { generateToken } from "../JWT_services/index.js";

export const authenticateUser = async ({ email, password }) => {

    const user = await User.findOne({ email });
    if(!user) {
        return {
            status: 400,
            message: `No user found with this email Id`
        }
    } else {
        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if(!isPasswordMatched) {
            return {
                status: 400,
                message: 'Wrong password'
            }
        }

        const token = await generateToken(user);
        await upsertTokenForUser(user, token);
        return {
            status: 200,
            message: 'Login successfull',
            token
        }
    }
}


export const upsertTokenForUser = async (user, token) => {
    const tokenInstance = await Token.findOne({userId: user._id});
    if(tokenInstance) {
        await tokenInstance.deleteOne();
    }
    
    const newToken = Token({
        userId: user._id,
        token
    })

    await newToken.save();
}
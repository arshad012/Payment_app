import { User } from "../models/index.js"
import bcrypt from 'bcrypt'

export const saveUser = async (user) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);

    try {
        const newUser = new User({ ...user, password: hashedPassword });
        await newUser.save();
        return {success: true, message: 'Signup seccessfull', user: newUser};
    } catch (error) {
        return {success: false, message: error.message};
    }
}
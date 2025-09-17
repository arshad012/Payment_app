import { User } from "../models/index.js";

export const getUserInfo = async (req, res) => {

    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            })
        }

        return res.status(200).json({
            user: user
        })
    } catch (error) {
        return res.status(500).json({ 
            message: 'Server error'
        });
    }
}
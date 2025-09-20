import { validateEmail, validateName, validatePassword } from './validators/index.js';
import { saveUser } from '../helper/index.js';

export const signup = async (req, res) => {
    const { name, email, password, school_id } = req.body;

    // check all fields are valid or not
    if (!validateName(name)) {
        return res.json({
            message: 'Name seems not correct. please check once and retry'
        });
    }

    if (!validateEmail(email)) {
        return res.json({
            message: 'Invalid email. please try with any other email'
        });
    }

    if (!validatePassword(password)) {
        return res.json({
            message: 'Invalid password. please fulfill password requirements'
        });
    }

    // save user with hashed password
    const result = await saveUser(req.body);
    if (result.success) {
        return res.status(200).json({ ...result });
    } else {
        return res.status(400).json({ ...result });
    }
}
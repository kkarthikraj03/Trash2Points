import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/* REGISTER USER */
export const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            password: passwordHash,
            // Other fields from your user model
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) return res.status(400).json({ msg: 'User does not exist' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        // Sending user data in response along with the token
        res.status(200).json({
            token,
            user: {
                id: user._id,
                username: user.username,
                // Add other user fields you want to send
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const logout = async (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
};

import express from "express";
import { login, register, logout } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);

router.get('/fetch-user-data', verifyToken, async (req, res) => {
    try {
        // req.user contains the authenticated user's information from the token
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Return user data without the password
        const userData = {
            id: user._id,
            username: user.username,
            // Add other user fields you want to send
        };

        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

export default router;
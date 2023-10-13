import User from '../models/User.js';

export const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await User.find({}, 'username points').sort({ points: -1 });
        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

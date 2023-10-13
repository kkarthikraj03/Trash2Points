import User from '../models/User.js'; 



export const registerPoint = async (req, res) => {
    try {
        // Extract other data from the request body
        const { username, rollNumber, department, date, time, wasteType } = req.body;
        
        // Extract the file path from req.file
        const proofPath = req.file ? req.file.path : '';

        // Create a new Point document
        const newPoint = new Point({
            username,
            rollNumber,
            department,
            date,
            time,
            wasteType,
            proof: proofPath, // Save the file path to your schema
            // Other fields
        });

        // Save the newPoint document to the database
        const savedPoint = await newPoint.save();

        res.status(201).json(savedPoint); // Respond with the saved point data
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const addPoints = async (req, res) => {
    try {
        const { username, wasteType } = req.body;
        
        // Define point values based on waste type
        const pointValues = {
            plastic: 10,
            paper: 15,
            // Add more waste types and their corresponding point values
        };

        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        // Update the user's points based on waste type
        const pointsToAdd = pointValues[wasteType] || 0;
        user.points += pointsToAdd;
        await user.save();

        res.status(200).json({ msg: 'Points added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


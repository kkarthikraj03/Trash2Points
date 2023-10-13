import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import methodOverride  from "method-override";
import path from "path";
import { fileURLToPath } from "url";


import User from "./models/User.js";
import Point from "./models/Point.js";
import Leaderboard from "./models/Leaderboard.js";

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/point.js";
import leaderboardRoutes from './routes/leaderboard.js';


/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(cors(
    {
        origin: "http://localhost:3000",
    }
));
app.get("/", (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', "true");
    res.send("Backend is working...");
});
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(methodOverride('_method'));
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/* FILE STORAGE */
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, "public/assets");
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });
// const upload = multer({ storage });

app.use('/auth', authRoutes);
app.use('/point', postRoutes);
app.use('/leaderboard',leaderboardRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 3001;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => console.log(`Serving on port: ${PORT}`));
        console.log("Database Connected!");
    })
    .catch((err) => console.log(`${err} did not connect!!!`));

// async function addSampleData() {
//     try {
//         // Create and save sample users
//         const user1 = new User({ username: 'user1', password: 'password1' });
//         await user1.save();

//         const user2 = new User({ username: 'user2', password: 'password2' });
//         await user2.save();

//         // Create and save sample points
//         const point1 = new Point({
//             user: user1._id,
//             date: new Date(),
//             time: '10:00 AM',
//             wasteType: 'paper',
//             department: 'CSE',
//             proof: 'path/to/proof1.jpg'
//         });
//         await point1.save();

//         // Update user1's points and create/update leaderboard entry
//         user1.points += 10; // Update points
//         await user1.save();
//         let leaderboardEntry1 = await Leaderboard.findOne({ user: user1._id });
//         if (!leaderboardEntry1) {
//             leaderboardEntry1 = new Leaderboard({ user: user1._id });
//         }
//         leaderboardEntry1.points = user1.points; // Update points in leaderboard entry
//         await leaderboardEntry1.save();

//         const point2 = new Point({
//             user: user2._id,
//             date: new Date(),
//             time: '11:00 AM',
//             wasteType: 'plastic',
//             department: 'ECE',
//             proof: 'path/to/proof2.jpg'
//         });
//         await point2.save();

//         // Update user2's points and create/update leaderboard entry
//         user2.points += 20; // Update points
//         await user2.save();
//         let leaderboardEntry2 = await Leaderboard.findOne({ user: user2._id });
//         if (!leaderboardEntry2) {
//             leaderboardEntry2 = new Leaderboard({ user: user2._id });
//         }
//         leaderboardEntry2.points = user2.points; // Update points in leaderboard entry
//         await leaderboardEntry2.save();

//         console.log('Sample data added successfully');
//     } catch (error) {
//         console.error('Error adding sample data:', error);
//     } finally {
//         // Disconnect from MongoDB after adding sample data
//         mongoose.disconnect();
//     }
// }

// addSampleData();

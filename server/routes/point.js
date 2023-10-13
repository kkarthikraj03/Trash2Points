import express from "express";
import multer from "multer";
import path from "path";
import { registerPoint, addPoints } from "../controllers/point.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets'); // Set your destination folder
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extname = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + extname);
    },
});


const upload = multer({ storage });

router.post('/register-point', upload.single('proof'), registerPoint);
router.post('/add-points', addPoints);

export default router;

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/assets'); // Set your destination folder
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname);
//     }
// });
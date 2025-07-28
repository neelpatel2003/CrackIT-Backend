import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import AllRoutes from './router/manageRoutes.js';
import User from './model/user.js'; // Only if used here
import efficiencyRouter from './router/efficiency.js';
dotenv.config();
import cors from 'cors';
const app = express();


const allowedOrigins = [
    'http://localhost:5173',
    'https://crack-it-frontend-nine.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.log("Blocked CORS for origin:", origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));
app.options('*', cors());


const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(efficiencyRouter);
app.use(bodyParser.json());
app.use(AllRoutes);

mongoose.connect(process.env.MONGOPATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("✅ Connected to MongoDB");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
    });

app.post('/api/logout', (req, res) => {
    // No backend state to clear? Just confirm logout.
    return res.status(200).json({ message: 'Logged out successfully' });
});

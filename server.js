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

app.use(cors({
    origin: 'https://crack-it-frontend-nine.vercel.app', // allow Vercel frontend
    credentials: true
}));
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

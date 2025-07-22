import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import AllRoutes from './router/manageRoutes.js';
import User from './model/user.js'; // Only if used here

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

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

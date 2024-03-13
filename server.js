import Express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import User from './model/user.js';
import bodyParser from "body-parser";
import AllRoutes from './router/manageRoutes.js'
dotenv.config();

const app = Express();
const PORT = process.env.PORT || 8080;
mongoose.connect("mongodb://localhost:27017/cracit-app-db");

app.use(bodyParser.json());
app.use(AllRoutes);

app.listen(PORT, () => {
   console.log(`Listening on ${PORT}`);
})
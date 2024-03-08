import Express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import User from './model/user.js';
dotenv.config();

const app = Express();
const PORT = process.env.PORT || 8080;
mongoose.connect("mongodb://localhost:27017/cracit-app-db");

app.use(Express.json());
app.get('/Hello', (req, res) => {
   return res.status(200).json({ message: "Hello!" });
})

app.post('/api/signup', async (req, res) => {
   console.log(req.body);

   const { username, email, password } = req.body;

   try {
      const newUser = await User({
         username: username,
         email: email,
         password: password
      });

      const response = await newUser.save();
      console.log('User created successfully: ', response)
      return res.status(201).json({ status: 'Created!' });
   } catch (err) {
      return res.status(400).json({ status: 'error', error: 'Username already in use.' });
   }
})

app.post('/api/login', async (req, res) => {
   console.log(req.body);
   const { email, password } = req.body
   try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ staus: 'error', error: 'User not found!' });
      if ((!(user.password == password))) {
         return res.status(400).json({ status: 'error', error: 'Invalid password!' });
      }
      else {
         return res.status(200).json({ status: 'ok', message: 'Login successful', user: user });
      }
   }
   catch (err) {
      return res.status(400).json({ status: 'error', error: 'Error occures.' });
   }
})

app.listen(PORT, () => {
   console.log(`Listening on ${PORT}`);
})
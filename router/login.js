import { Router } from "express";
import User from '../model/user.js';
import bcrypt from 'bcryptjs';

const router = new Router();

router.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ status: 'error', error: 'User not found!' });

        const isMatch = await bcrypt.compare(password, user.password); // FIXED
        if (!isMatch) {
            return res.status(400).json({ status: 'error', error: 'Invalid password!' });
        }

        return res.status(200).json({ status: 'ok', message: 'Login successful', user });
    } catch (err) {
        return res.status(500).json({ status: 'error', error: 'An error occurred.' });
    }
});

export default router;

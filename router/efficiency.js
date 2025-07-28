import { Router } from "express";
import EfficiencyResult from "../model/efficiencyResult.js";
import nodemailer from "nodemailer";

const router = new Router();

router.post('/api/efficiency', async (req, res) => {
    const { email, efficiency } = req.body;
    if (!email || !efficiency) {
        return res.status(400).json({ message: "Email and efficiency required." });
    }
    try {
        const result = new EfficiencyResult({ email, efficiency });
        await result.save();
        res.json({ message: "Efficiency result stored." });
    } catch (err) {
        res.status(500).json({ message: "Error saving efficiency result." });
    }
});

router.post('/api/efficiency/send', async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required." });

    const result = await EfficiencyResult.findOne({ email }).sort({ createdAt: -1 });
    if (!result) return res.status(404).json({ message: "No efficiency result found." });

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: "your_ethereal_user@ethereal.email",
            pass: "your_ethereal_password"
        }
    });

    try {
        await transporter.sendMail({
            from: '"CrackIT" <no-reply@crackit.com>',
            to: email,
            subject: "Your Coding Efficiency Results",
            text: `Here are your results: ${JSON.stringify(result.efficiency)}`
        });
        res.json({ message: "Email sent!" });
    } catch (err) {
        res.status(500).json({ message: "Failed to send email", error: err.message });
    }
});

export default router;
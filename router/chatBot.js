// import OpenAI from "openai";
import { Router } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import chatData from "../model/chatData.js";

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const router = new Router();


// Input sanitization helper
const sanitizeInput = (input) => {
    if (typeof input !== 'string') return '';
    return input.trim().replace(/[<>]/g, '');
};
router.post('/api/chat', async (req, res) => {
    const { prompt, username } = req.body;

    // Validate and sanitize required fields
    const sanitizedPrompt = sanitizeInput(prompt);
    const sanitizedUsername = sanitizeInput(username);

    if (!sanitizedPrompt || !sanitizedUsername) {
        return res.status(400).json({
            status: 'error',
            message: 'Both prompt and username are required and cannot be empty.'
        });
    }

    // Check prompt length
    if (sanitizedPrompt.length > 1000) {
        return res.status(400).json({
            status: 'error',
            message: 'Prompt is too long. Maximum 1000 characters allowed.'
        });
    }

    try {
        // Generate content
        const result = await ai.getGenerativeModel({ model: "gemini-1.5-flash" }).generateContent(sanitizedPrompt)
        const response = await result.response;
        const text = response.text()

        // Save chat data
        const newChatData = new chatData({
            username: sanitizedUsername,
            question: sanitizedPrompt,
            answer: text
        });

        await newChatData.save();

        return res.status(200).json({
            status: 'success',
            message: text,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Chat error:', error);

        // Handle specific Gemini API errors
        if (error.message?.includes('API_KEY')) {
            return res.status(500).json({
                status: 'error',
                message: 'Invalid API key configuration.'
            });
        }

        return res.status(500).json({
            status: 'error',
            message: 'Error requesting AI bot.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }

});


export default router;
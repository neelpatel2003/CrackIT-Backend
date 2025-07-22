import { GoogleGenAI } from "@google/genai";

import dotenv from 'dotenv';
import { Router } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import chatData from "../model/chatData.js";

dotenv.config();
const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

const router = new Router();

// Input sanitization helper
const sanitizeInput = (input) => {
    if (typeof input !== 'string') return '';
    return input.trim().replace(/[<>]/g, '');
};
router.post('/api/chat', async (req, res) => {
   const { prompt } = req.body;
   try {
      const response = await ai.models.generateContent({
         model: "gemini-2.0-flash",
         contents: prompt
      });

      return res.send(response.text);
   } catch (error) {
      console.log(error.message);
      return res.status(500).send({ status: 'error', message: 'Error requesting AI bot.' });
   }
})

export default router;
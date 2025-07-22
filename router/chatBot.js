import { GoogleGenAI } from "@google/genai";

import dotenv from 'dotenv';
import { Router } from "express";

dotenv.config();
const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

const router = new Router();

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
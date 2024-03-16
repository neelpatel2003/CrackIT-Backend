import { Router } from "express";
import Question from "../model/question.js"
import OpenAI from "openai";
import dotenv from 'dotenv';

const router = new Router();

router.get('/api/quetions', async (req, res) => {
   console.log(req);
   try {
      const quetions = await Question.find();

      console.log(quetions);
      return res.status(200).send({ status: 'OK', message: 'Success', Questions: quetions });
   } catch (err) {
      return res.status(404).send({ status: 'error', message: 'Error occures to load data!' });
   }
})

router.get('/api/questions/:title', async (req, res) => {
   console.log(req);
   const title = req.params.title;
   console.log(title);
   try {
      const quetion = await Question.findOne({ title: title });
      return res.status(200).send({ status: 'OK', message: 'Found quetion', Question: quetion });
   } catch (err) {
      return res.status(404).send({ status: "error", error: err.message });
   }
})

router.post('/api/quetions/:title/submit', (req, res) => {


})

export default router;
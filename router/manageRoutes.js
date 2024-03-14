import { Router } from "express";
import SignupRouter from './signup.js';
import LoginRouter from './login.js';
import UserRoter from './user.js';
import ChatBotRouter from './chatBot.js';
const router = new Router();

router.use(SignupRouter);
router.use(LoginRouter);
router.use(UserRoter);
router.use(ChatBotRouter);

export default router;
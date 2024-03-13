import { Router } from "express";
import SignupRouter from './signup.js';
import LoginRouter from './login.js';
import UserRoter from './user.js';
const router = new Router();

router.use(SignupRouter);
router.use(LoginRouter);
router.use(UserRoter);

export default router;
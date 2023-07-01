import express from 'express';
import { registerController, loginController, logoutController } from '../controllers/authControllers.js';

const router = express.Router();

router.post('/register', registerController);

router.post('/login', loginController);

router.post('/logout', logoutController);

export default router;

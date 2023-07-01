import express from 'express';
import { summaryController, paragraphController, chatbotController, jsController, imageController } from '../controllers/openaiController.js';

const router = express.Router();

router.post('/summary', summaryController);
router.post('/paragraph', paragraphController);
router.post('/chatbot', chatbotController);
router.post('/js-converter', jsController);
router.post('/image', imageController);

export default router;

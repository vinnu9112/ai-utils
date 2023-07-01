const express = require ('express');
const { summaryController, paragraphController, chatbotController, jsController, imageController } = require('../controllers/openaiController');

const router = express.Router();

router.post('/summary', summaryController)
router.post('/paragraph', paragraphController)
router.post('/chatbot', chatbotController)
router.post('/js-converter', jsController)
router.post('/image', imageController)




module.exports = router
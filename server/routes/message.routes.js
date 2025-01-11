const express = require('express');
const router = express.Router();
const { createMessage,getMessage } = require('../controllers/message.controllers');

// POST route to create a conversation using URL params
router.post('/create', createMessage);
router.get('/:conversationId', getMessage);

module.exports = router;

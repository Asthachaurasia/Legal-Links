const express = require('express');
const router = express.Router();
const { createConversation,getconversation } = require('../controllers/conversation.controllers');

// POST route to create a conversation using URL params
router.post('/create', createConversation);
router.get('/:userId', getconversation);

module.exports = router;

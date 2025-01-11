const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  mid: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),  // Use a function to generate a new ObjectId
  },
  conversationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
  },
  sender_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  receiver_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Lawyer',
    required: true 
  },
  message: { 
    type: String, 
    required: true
  },
  attachments: [{
    file_type: { type: String },
    file_url: { type: String },
  }],
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
  status: { 
    type: String, 
    enum: ['read', 'unread'],
    default: 'unread' 
  },
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

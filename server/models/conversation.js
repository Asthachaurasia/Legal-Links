const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'senderType', // Dynamically reference either 'User' or 'Lawyer'
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'receiverType', // Dynamically reference either 'User' or 'Lawyer'
        required: true,
    },
    senderType: {
        type: String,
        enum: ['User', 'Lawyer'], // Restrict sender type to 'User' or 'Lawyer'
        required: true,
    },
    receiverType: {
        type: String,
        enum: ['User', 'Lawyer'], // Restrict receiver type to 'User' or 'Lawyer'
        required: true,
    }
}, { timestamps: true });

const conversation = mongoose.model('conversation', conversationSchema);

module.exports = conversation;

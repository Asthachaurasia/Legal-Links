const conversation= require("../models/conversation");
const Users = require("../models/users");
const Lawyers = require("../models/lawyers");
const mongoose = require('mongoose');

const createConversation = async (req, res) => {
    try {
        console.log("req",req);
        const { senderId, receiverId, senderType, receiverType } = req.body;  
         
        // Check if senderType and receiverType are valid
        if (!['User', 'Lawyer'].includes(senderType) || !['User', 'Lawyer'].includes(receiverType)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid sender or receiver type',
            });
        }

        // Ensure senderId and receiverId are valid ObjectIds
        if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
            console.log("receiverId",receiverId);
            console.log("senderId",senderId);
            
            
            return res.status(400).json({
                success: false,
                message: 'Invalid sender or receiver ID format',
                
            });
        }

        


        // Create a new conversation with senderId, receiverId, senderType, and receiverType
        const newConversation = new conversation({
            sender:new mongoose.Types.ObjectId(senderId),  // Use valid ObjectId
            receiver:new mongoose.Types.ObjectId(receiverId),  // Use valid ObjectId
            senderType: senderType,  // Sender type (User or Lawyer)
            receiverType: receiverType,  // Receiver type (User or Lawyer)
        });

        await newConversation.save();
        res.status(200).json({
            success: true,
            message: "Conversation started successfully",
            newConversationid: newConversation._id,
        });
    } catch (error) {
        console.log("Error:", error.message);
        return res.status(500).json({
            success: false,
            message: "Unable to create conversation",
        });
    }
};




 


const getconversation = async (req, res) => {
    try {
        const userId = req.params.userId; // Extract userId from URL params

        // Fetch all conversations where the user is either the sender or the receiver
        const conversations = await conversation.find({
            $or: [
                { sender: new mongoose.Types.ObjectId(userId) }, // User is the sender
                { receiver:new mongoose.Types.ObjectId(userId) }, // User is the receiver
            ]
        });

        if (!conversations || conversations.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No conversations found for this user.",
                conversation:[],
            });
        }
        let user;
        // Now fetch the other user (receiver or sender) in each conversation
        const conversationUserData = await Promise.all(conversations.map(async (conversation) => {
            const receiverId = conversation.sender.toString() === userId ? conversation.receiver : conversation.sender;

            // Check if the receiver exists in the Users or Lawyers collection
              user = await Users.findById(receiverId);
            if (!user) {
                user = await Lawyers.findById(receiverId);  // If not in Users, check Lawyers
            }

            return {
                talker: user ? { id:user._id,email: user.email, name: user.name } : null,  // Return the user details
                conversationId: conversation._id,
            };
        }));
console.log("conversations",conversations);
        return res.status(200).json({
            success: true,
            allconversation: conversationUserData,
               
        });
    } catch (error) {
        console.log(error, "Error while fetching conversations");
        return res.status(500).json({
            success: false,
            message: "Unable  to load conversations.",
        });
    }
};


module.exports = {
    createConversation,
    getconversation
};


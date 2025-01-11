const Message = require("../models/messages");
const User = require("../models/users");
const Conversations = require("../models/conversation");
const Lawyer = require("../models/lawyers")
const createMessage = async (req, res) => {
  try {
    const { conversationId, senderId, message, receiverId } = req.body;
    console.log("conversationId", conversationId);
    console.log("senderId", senderId);
    console.log("message", message);
    console.log("receiverId", receiverId);

    // Validate required fields
    if (!senderId || !message||!receiverId  ) {
      return res.status(400).json({
        success: false,
        message: "Sender ID, message, and either conversationId or receiverId are required",
      });
    }

    // If conversationId is not provided, create a new conversation
    if (!conversationId && receiverId) {
      let existingConversation = await Conversations.findOne({
        $or: [
          { sender: senderId, receiver: receiverId },
          { sender: receiverId, receiver: senderId }
        ]
      });

      if (!existingConversation) {
        // Create a new conversation if it doesn't exist
        const newConversation = new Conversations({
          sender: senderId,
          receiver: receiverId,
          senderType: "User",  // Assuming senderType is User, adjust if needed
          receiverType: "Lawyer",  // Assuming receiverType is Lawyer, adjust if needed
        });

        await newConversation.save();
        existingConversation = newConversation;
      }

      // Create a new message for the conversation
      const newMessage = new Message({
        conversationId: existingConversation._id,
        sender_id: senderId, // Ensure sender_id is set correctly
        receiver_id:receiverId,
        message,
      });
      await newMessage.save();

      return res.status(200).json({
        success: true,
        message: "Message sent successfully",
        messageId: newMessage._id,
      });
    }

    // If conversationId exists, create a message in the existing conversation
    if (conversationId) {
      const newMessage = new Message({
        conversationId,
        sender_id: senderId, // Ensure sender_id is set correctly
        receiver_id:receiverId,
        message,
      });
      await newMessage.save();

      return res.status(200).json({
        success: true,
        message: "Message sent successfully",
        messageId: newMessage._id,
      });
    }
  } catch (error) {
    console.error("Error in sending message:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to send message",
    });
  }
};






 

const getMessage = async (req, res) => {
  try {
    const conversationId = req.params.conversationId;

    if (conversationId === 'new') {
      return res.status(200).json({
        fetched_messages: [],
      });
    }

    const messages = await Message.find({ conversationId });

    if (messages.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No messages found for this conversation",
        fetched_messages: [],
      });
    }

    const userIds = messages.map(message => message.sender_id);
    
    // Fetch only the necessary sender details
    const users = await User.find({ _id: { $in: userIds } });
    console.log("users", users);
    
    let userMap = {};
    
    if (users.length > 0) {
      userMap = users.reduce((acc, user) => {
        acc[user._id.toString()] = { 
          id: user._id, 
          email: user.email || "N/A", 
          name: user.name || "Unknown" 
        };
        return acc;
      }, {});
    }

    // Fetch lawyer details for users not found
    const missingUserIds = userIds.filter(id => !userMap[id.toString()]);
    let lawyerMap = {};

    if (missingUserIds.length > 0) {
      const lawyers = await Lawyer.find({ _id: { $in: missingUserIds } });
      lawyerMap = lawyers.reduce((acc, lawyer) => {
        acc[lawyer._id.toString()] = { 
          id: lawyer._id, 
          email: lawyer.email || "N/A", 
          name: lawyer.name || "Unknown" 
        };
        return acc;
      }, {});
    }

    const messageUserData = messages.map((message) => {
      const user = userMap[message.sender_id.toString()] || 
                   lawyerMap[message.sender_id.toString()] || 
                   { id: "Unknown", email: "N/A", name: "Unknown" };
      return {
        user,
        message: message.message,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Fetched messages successfully",
      fetched_messages: messageUserData,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to get messages",
    });
  }
};
0
 


module.exports = { createMessage ,getMessage};  
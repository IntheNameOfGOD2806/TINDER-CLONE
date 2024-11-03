import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";
export const sendMessage = async (req, res) => {
    try {
        const { senderId, receiverId, content } = req.body;
        const newMessage = new Message({ senderId, receiverId, content });
        const currentConversation = await Conversation.findOne({
            senderId: senderId,
            receiverId: receiverId
        });
        if (!currentConversation) {
            const newConversation = new Conversation({ senderId, receiverId, messages: [] });
            newConversation.messages.push(newMessage._id);
            Promise.all([
                newConversation.save(),
                newMessage.save()
            ])
        }
        else {
            currentConversation.messages.push(newMessage._id);
            Promise.all([
                currentConversation.save(),
                newMessage.save()
            ])
        }
        res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
export const getAllMessages = async (req, res) => {
    try {
        const currentUserId = req.user._id;
        const { userToChatId } = req.params;
        const conversation = await Conversation.findOne({
            senderId: currentUserId,
            receiverId: userToChatId
        });

        res.status(200).json({ success: true, messages: conversation?.messages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}   
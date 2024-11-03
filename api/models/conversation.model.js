import mongoose from "mongoose";
 export const conversationSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            required: true,
            default: []
        }
    ]
}, { timestamps: true })

export const Conversation = mongoose.model('Conversation', conversationSchema)  
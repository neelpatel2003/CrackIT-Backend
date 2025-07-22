import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    question: {
        type: String,
        required: true,
        trim: true
    },
    answer: {
        type: String,
        required: true,
        trim: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const chatData = mongoose.model('chatData', chatSchema);

export default chatData; 
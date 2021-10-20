const mongoose = require('mongoose');
const { Schema } = mongoose;

const MessageSchema = new Schema({
    chat_id: {
        ref: "Channel",
        type: Schema.Types.ObjectId
    },
    author: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    attachments: [{
        type: String
    }],
    replyTo_id: {
        type: String
    }
});

const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;

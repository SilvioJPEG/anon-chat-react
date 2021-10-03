const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
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
    }
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;

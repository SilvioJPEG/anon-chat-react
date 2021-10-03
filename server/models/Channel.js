const mongoose = require('mongoose');
const { Schema } = mongoose;

const channelSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        default: "dg3.png"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Channel = mongoose.model("Channel", channelSchema);

module.exports = Channel;
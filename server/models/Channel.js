const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChannelSchema = new Schema({
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

const Channel = mongoose.model("Channel", ChannelSchema);
module.exports = Channel;
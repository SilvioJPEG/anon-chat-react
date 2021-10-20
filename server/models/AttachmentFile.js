const mongoose = require('mongoose');
const { Schema } = mongoose;

const AttachmentSchema = new Schema({
    name: String,
    size: Number,
    url: String,
    author: String, 
});
  
module.exports = new mongoose.model('Attachment', AttachmentSchema);
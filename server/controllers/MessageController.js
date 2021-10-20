const messageModel = require("../models/Message");
const AttachmentModel = require("../models/AttachmentFile");
const multer = require("multer");
const uploader = require("../core/multer");
const e = require("express");

class MessageController {

    index(req, res) {
        messageModel.find().then((err, messages) => {
            if (err) {
                return res.send(err);
            }
            res.json(messages);
        });
    }
    async channel_msgs(req, res) {
        messageModel.find({chat_id: req.params.id}).then((err, messages) => {
            if (err) {
                return res.send(err);
            }
            res.status(200).json(messages);
        });
    }

    create(req, res) {
        uploader(req, res, function(err) { 
            let filesArray = [];
            // req.file contains information of uploaded file
            // req.body contains information of text fields, if there were any
            if (req.file) {
                if (req.fileValidationError) {
                    return res.status(500).send(req.fileValidationError);
                }
                else if (err instanceof multer.MulterError || err) {
                    return res.status(500).send(err);
                }
                const file = new AttachmentModel({
                    name: req.file.filename,
                    size: req.file.size,
                    url: req.file.destination,
                    author: req.body.author,
                });
                file.save();
                filesArray.push(req.file.filename);
            }
            const msg = new messageModel({
                chat_id: req.body.chat_id,
                author: req.body.author,
                text: req.body.text,
                attachments: filesArray,
                replyTo_id: req.body.replyTo_id
            }); 
            msg.save().then(() => {
                res.status(200).json(msg); 
            });
        });
    }
}

module.exports = MessageController;
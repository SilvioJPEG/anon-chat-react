const messageModel = require("../models/Message");

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
            res.json(messages);
        });
    }
    last_msg(req, res) {
        messageModel.findOne(
            {},
            { sort: { date: -1 } },
            (err, data) => {
               console.log(data);
            },
          );
    }
    create(req, res) {
        const msg = new messageModel({
            chat_id: req.body.chat_id,
            author: req.body.author,
            text: req.body.text,
        })
        msg.save().then(() => {
            return res.status(200).json(msg);
        })
    }

}

module.exports = MessageController;
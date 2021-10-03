const channelModel = require("../models/Channel");

class ChannelController {
    index(req, res) {
        channelModel.find().then((err, channels) => {
            if (err) {
                return res.send(err);
            }
            res.json(channels);
        })
    }

    create(req, res) {
        const channel = new channelModel({
            author: req.body.author,
            name: req.body.name,
            imgUrl: req.body.imgUrl
        })
        channel.save().then(() => {
            return res.status(200).json(channel);
        })
    }

    delete(req, res) {
        channelModel.remove({
            _id: req.body.id
        }).then((channel) => {
            if (channel) {
                res.json({status: 'deleted'});
            } 
            res.json({status: 'error'});
        })
    }

    update() {}
}

module.exports = ChannelController;
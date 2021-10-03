const {Router} = require('express');
const Channel = require('../models/Channel');
const router = Router();

const ChannelController = require("../controllers/ChannelController");
const MessageController = require("../controllers/MessageController");
const chController = new ChannelController();
const msgController = new MessageController();

router.get('/channels', chController.index);
router.post('/channels', chController.create);
router.delete('/channels:id', chController.delete);

router.get('/messages', msgController.index);
router.get('/messages/:id', msgController.channel_msgs);
router.get('/last/:id', msgController.last_msg);
router.post('/messages', msgController.create);

module.exports = router;
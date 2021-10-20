const {Router} = require('express');
const router = Router();

const ChannelController = require("../controllers/ChannelController");
const MessageController = require("../controllers/MessageController");
const chController = new ChannelController();
const msgController = new MessageController();

router.get('/channels', chController.index);
router.post('/channels', chController.create);
router.delete('/channels:id', chController.delete);

router.get('/messages', msgController.index); //return all messages for all chats
router.get('/messages/:id', msgController.channel_msgs); //all messages for chat with specific id
router.post('/messages', msgController.create);

module.exports = router;
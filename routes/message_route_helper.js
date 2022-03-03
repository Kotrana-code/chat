var express = require('express');
var router = express.Router();

var message = require("../controller/message");


router.post('/add', message.addMessage);

router.get('/get_message/:id/:dest',  message.getMessage);

router.get('/get_if_user_active/:id',  message.getIfUserActive);

router.get('/get_inbox/:id',  message.getInbox);

module.exports = router;
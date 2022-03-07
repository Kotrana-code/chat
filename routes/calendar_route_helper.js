var express = require('express');
var router = express.Router();

var calendar = require("../controller/calendar");


router.post('/add', calendar.addcalendar);


module.exports = router;
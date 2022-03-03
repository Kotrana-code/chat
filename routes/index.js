var express = require('express');
var router = express.Router();
const path = require('path');
var db = require("../config/config");

var message_route_helper = require("./message_route_helper");


module.exports = app => {

  app.get('/', function(req,res){
    res.sendFile(path.join(__dirname, '../views/chat.html'));
  });

  //all route declared here
  app.use('/api', message_route_helper);

};

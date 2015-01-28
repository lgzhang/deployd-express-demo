"use strict";

var PORT = process.env.PORT || 3000;
var ENV = process.env.NODE_ENV || 'development';

var MONGODB_HOST = process.env.WERCKER_MONGODB_HOST || 'localhost';
var MONGODB_PORT = process.env.WERCKER_MONGODB_PORT || 27017;

// setup express
var express = require('express');
var app = exports.app = express();
var server = require('http').createServer(app);


app.get('/', function (req, res) {
  res.send('Hello World!')
});

// setup deployd
require('deployd').attach(server, {
  env: ENV,
  db: {host: MONGODB_HOST, port: MONGODB_PORT, name: 'test-app'}
});

// After attach, express can use server.handleRequest as middleware
app.use(server.handleRequest);

// start server
server.listen(PORT, function() {
  console.log('Express & Deployd listening at http://%s:%s', server.address().address, server.address().port)
});

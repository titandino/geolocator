'use strict';

const fs = require('fs');
const http = require('http');
const https = require('https');
const webpack = require('webpack');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const key = fs.readFileSync( 'key.pem' );
const cert = fs.readFileSync( 'cert.pem' );

const errors = require('./lib/errhandling');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', function(req, res, next) {
  console.log('Connection from: ' + req.connection.remoteAddress.replace('::ffff:', '') + ' requesting ' + req.url);
  next();
});

app.use('/api', require('./routes/api'));

app.use(errors);

console.log('Building webpage...');
webpack(require('./webpack.config.js'), (err, stats) => {
  if (err || stats.hasErrors()) {
    console.log(err);
    console.log(stats.compilation.errors);
    return;
  }
  console.log('Built webpage successfully...');
  let httpServer = http.createServer(app).listen(80, function() {
    console.log('Portfolio server listening at http://' + httpServer.address().address + ':' + httpServer.address().port);
  });
  let httpsServer = https.createServer({
    key: key,
    cert: cert
  }, app).listen(443, function() {
    console.log('Portfolio server listening at https://' + httpsServer.address().address + ':' + httpsServer.address().port);
  });
});

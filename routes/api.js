const express = require('express');
const http = require('http');

const router = express.Router();

router.get('/geolocate/:ip', function(req, res, next) {
  http.get('http://ip-api.com/json/'+req.params.ip, data => {
    let body = '';

    data.on('data', chunk => {
        body += chunk;
    });

    data.on('end', () => {
      res.json(JSON.parse(body));
    });
  });
});

module.exports = router;

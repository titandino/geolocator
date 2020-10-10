const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const router = express.Router();

router.post('/geolocate', function(req, res, next) {
  axios.post('http://ip-api.com/batch', req.body.ips)
  .then(ipRes => {
    res.json(ipRes.data);
  }).catch(err => {
    console.log(err)
    res.json({ err: 'Error handling request' });
  });
});

module.exports = router;

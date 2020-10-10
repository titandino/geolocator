module.exports = function(err, req, res, next) {
  if (err) {
    console.log('ERROR: ' + err.message);
    return res.status(err.status || 500).json({ msg: err.message } || { msg: 'Bad Request' }).end();
  }
  next();
};

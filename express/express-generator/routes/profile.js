var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('profile page');
});

router.get('/test', function(req, res, next) {
    res.send('test page');
});

module.exports = router;

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var Messages = require('./messages');

router.post('/get', function (req, res) {
  Messages.getMessages(req.body, function (err, rows) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(rows);
    }
  });
});

router.post('/send', function(req, res) {
  Messages.insertMessage(req.body, function (err, rows) {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var Messages = require('./messages');

router.post('/get', (req, res) => {
  Messages.getMessages(req.body, (err, rows) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(rows);
    }
  });
});

router.post('/send', (req, res) => {
  Messages.insertMessage(req.body, (err, rows) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
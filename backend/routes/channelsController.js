var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var Channels = require('./channels');

router.get('/', (req, res) => {
  Channels.getChannels((err, rows) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(rows);
    }
  });
});

router.post('/', (req, res) => {
  Channels.insertChannel(req.body.name, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      res.json(rows);
    }
  });
});

router.post('/rename', (req, res) => {
  Channels.renameChannel(req.body, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      res.json(rows);
    }
  });
});

module.exports = router;
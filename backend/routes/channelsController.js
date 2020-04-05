var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var Channels = require('./channels');

router.post('/notJoined', (req, res) => {
  Channels.getChannels(req.body.userId, (err, rows) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(rows);
    }
  });
});

router.post('/', (req, res) => {
  Channels.insertChannel(req.body, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      res.json(rows);
    }
  });
});

router.post('/addJoined', (req, res) => {
  Channels.addJoinedChannel(req.body, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      res.json(rows);
    }
  });
});

router.post('/getJoined', (req, res) => {
  Channels.getJoinedChannel(req.body.userId, (err, rows) => {
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

router.post('/name', (req, res) => {
  Channels.getName(req.body.channelId, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      res.json(rows);
    }
  });
});

router.post('/countUsers', (req, res) => {
  Channels.countUsers(req.body.channelId, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      res.json(rows);
    }
  });
});

router.post('/favChannel', (req, res) => {
  Channels.addFavChannel(req.body, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      res.json(rows);
    }
  });
});

router.post('/leave', (req, res) => {
  Channels.leaveChannel(req.body, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      res.json(rows);
    }
  });
});

router.post('/pseudo', (req, res) => {
  Channels.pseudo(req.body.userId, (err, rows) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      res.json(rows);
    }
  });
});
module.exports = router;
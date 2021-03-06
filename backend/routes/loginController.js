var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
router.use(bodyParser.json())
var Connection = require('./login')
var bcrypt = require('bcrypt')

router.post('/login', (req, res) => {
  Connection.login(req.body, (err, rows) => {
    if (err) {
      res.status(400).json(err)
    } else {
      if (rows.length > 0) {
        bcrypt.compare(req.body.password, rows[0].password, (err, result) => {
          if (result) {
            res.json({
              code: 200,
              success: 'login sucessfull',
              userId: rows[0].id
            })
          } else {
            res.json({
              code: 204,
              success: 'Email and password does not match'
            })
          }
        })
      } else {
        res.json({
          code: 204,
          success: 'Email does not exits'
        })
      }
    }
  })
})

router.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    var user = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hash,
      createdAt: req.body.createdAt
    }
    Connection.register(user, (error, rows) => {
      if (error) {
        res.send({
          code: 400,
          failed: 'error ocurred'
        })
      } else {
        res.send({
          code: 200,
          success: 'user registered sucessfully',
          userId: rows.insertId
        })
      }
    })
  })
})

router.post('/user', (req, res) => {
  Connection.getUser(req.body.userId, (err, rows) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.json(rows);
    }
  });
});
module.exports = router

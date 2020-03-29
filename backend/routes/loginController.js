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
              success: 'login sucessfull'
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
    console.log(user);
    Connection.register(user, (error, rows) => {
      if (error) {
        console.log(error);
        res.send({
          code: 400,
          failed: 'error ocurred'
        })
      } else {
        res.send({
          code: 200,
          success: 'user registered sucessfully'
        })
      }
    })
  })
})

module.exports = router

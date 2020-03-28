var express = require('express')
var router = express.Router()
var bodyParser = require('body-parser')
router.use(bodyParser.json())
var Connection = require('./login')

router.get('/login', (req, res) => {
  Connection.login(req.body, (err, rows) => {
    if (err) {
      res.status(400).json(err)
    } else {
      // console.log('The solution is: ', results);
      if (rows.length > 0) {
        if (rows[0].password == req.body.password) {
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
  Connection.register(req.body, (error, rows) => {
    if (error) {
      console.log('error ocurred', error)
      res.send({
        code: 400,
        failed: 'error ocurred'
      })
    } else {
      console.log('The solution is: ', rows)
      res.send({
        code: 200,
        success: 'user registered sucessfully'
      })
    }
  })
})

module.exports = router

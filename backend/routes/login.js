var db = require('../database/db')

var Connection = {
  login: (datas, callback) => {
    return db.query('SELECT * FROM users WHERE email = ?', [datas.email], callback);
  },
  register: (datas, callback) => {
    var user = {
    first_name: datas.first_name,
    last_name: datas.last_name,
    email: datas.email,
    password: datas.password,
    createdAt: datas.createdAt
  }
    return db.query('INSERT INTO users SET ?', user, callback);
  }
}

module.exports = Connection;
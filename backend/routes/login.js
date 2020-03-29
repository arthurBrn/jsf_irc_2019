var db = require('../database/db')

var Connection = {
  login: (datas, callback) => {
    return db.query('SELECT * FROM users WHERE email = ?', [datas.email], callback);
  },
  register: (user, callback) => {
    return db.query('INSERT INTO users SET ?', user, callback);
  }
}

module.exports = Connection;
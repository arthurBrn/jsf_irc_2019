var db = require('../database/db')

var Connection = {
  login: (datas, callback) => {
    return db.query('SELECT * FROM users WHERE email = ?', [datas.email], callback);
  },
  register: (user, callback) => {
    return db.query('INSERT INTO users SET ?', user, callback);
  },
  getUser: (userId, callback) => {
    return db.query('SELECT first_name, last_name FROM users WHERE id = ?', [userId], callback);
  }
}

module.exports = Connection;
var db = require('../database/db')

var Messages = {
  getMessages: function(datas, callback) { 
    return db.query('SELECT * from messages where userId = ? and channelId', [datas.userId, datas.channelId], callback);
  },
  insertMessage: function(datas, callback) {
    var objMsg = {
      message: datas.message,
      channelId: datas.channelId,
      userId: datas.userId,
      pseudo: datas.pseudo
    }
    return db.query('insert into messages set ?', objMsg, callback);
  }
}

module.exports = Messages;
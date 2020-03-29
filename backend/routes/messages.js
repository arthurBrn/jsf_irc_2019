var db = require('../database/db')

var Messages = {
  getMessages: function(datas, callback) { 
    return db.query('SELECT * from messages where channelId = ?', [datas.channelId], callback);
  },
  insertMessage: function(datas, callback) {
    var objMsg = {
      content: datas.content,
      channelId: datas.channelId,
      userId: datas.userId,
      pseudo: datas.pseudo
    }
    return db.query('insert into messages set ?', objMsg, callback);
  }
}

module.exports = Messages;
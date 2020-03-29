var db = require('../database/db')

var Messages = {
  getMessages: (datas, callback) => { 
    return db.query('SELECT * from messages where channelId = ?', [datas.channelId], callback);
  },
  insertMessage: (datas, callback) => {
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
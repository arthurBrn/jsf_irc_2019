var db = require('../database/db')

var Messages = {
  getMessages: (datas, callback) => { 
    return db.query('select m.pseudo, m.content from users u, messages m where u.id = m.userId and m.channelId = ? order by m.`date` ASC', [datas.channelId], callback);
  },
  insertMessage: (datas, callback) => {
    var objMsg = {
      content: datas.content,
      channelId: datas.channelId,
      userId: datas.userId,
      pseudo: datas.pseudo,
      date: datas.date
    }
    return db.query('insert into messages set ?', objMsg, callback);
  }
}

module.exports = Messages;
const db = require('./db');
module.exports = {
  addMusic:async sing => await db.q('insert into music (title,singer,time,filelrc,file,uid) values (?,?,?,?,?,?)',Object.values(sing)),
  updateMusic:async sing => await db.q('update music set title=?,singer=?,time=?,filelrc=?,file=?,uid=? where id=?',Object.values(sing)),
  deletMusic:async id => await db.q('delete from music where id=?',id),
  getMusicList:async uid => await db.q('select * from music where uid=?',uid),
}
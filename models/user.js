const db = require('./db');

module.exports = {
  checkUserName:async (name)=>await db.q(`select * from register where username=? `,name),
  insertUserName:async (...user)=>await db.q('insert into register (username,password,email) values (?,?,?)',user),
  doLogin:async (user)=>await db.q('select * from register where username=?',user)
}
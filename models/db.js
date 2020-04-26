var mysql      = require('mysql');
const {dbDir} = require('../config')
var pool = mysql.createPool(dbDir);

let db={};
db.q=function(sql,params){
  return new Promise((resolve,reject)=>{
    pool.getConnection(function (err, connection) {
      if(err){
        reject(err)
        return;
      }
      connection.query(sql,params,function(err,doc){
        console.log(`${sql}=>${params}`);
        
        connection.release();
        if(err){
          reject(err)
          return;
        }
        resolve(doc)
      })
    });
  })
}
 
module.exports = db;
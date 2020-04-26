const path = require('path')
module.exports= {
  appPort:8889,
  viewDir:path.resolve('./views'),
  staticDir:path.resolve('./public'),
  uploadDir:path.resolve('./public/files'),
  dbDir:{
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'musicdb'
  }
}
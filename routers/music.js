const Router = require('koa-router');
const musicController = require('../controller/music')
const musicRouter = new Router();

musicRouter.get('/music/index',musicController.getMusicList)
.get('/music/add',async ctx=>{
  ctx.render('add');
})
.get('/music/edit',async ctx=>{
  ctx.render('edit');
})
.post('/music/add',musicController.addMusic )
.post('/music/update',musicController.updateMusic )
.post('/music/delete',musicController.deletMusic )

module.exports = musicRouter;
const Router = require('koa-router');
const userController = require('../controller/user')
const userRouter = new Router();

userRouter
.get('/music/login',async ctx=>{
  ctx.render('login');
})
.get('/music/register',async ctx=>{
  ctx.render('register');
})
.get('/user/pic',userController.getPic)
// .post('/music/check-userName',userController.checkUsername)
.post('/music/check-userName',userController.checkUsername)
.post('/music/do-register',userController.doRegister)
.post('/music/do-login',userController.doLogin)




module.exports = userRouter;
const userModels = require('../models/user')
const captchapng = require('captchapng2');
module.exports = {
  // 校验用户名是否存在
  checkUsername:async (ctx,next) => {
    // 处理接受请求之类的繁琐事务，唯独不CRDU
    console.log('ctx.request.body',ctx.request.body);
    let {username} = ctx.request.body;
    // 查询数据库中是否存在该用户名
    let doc =await userModels.checkUserName(username);
    if(doc.length>0){
      // 存在该用户
      ctx.body = { code :'200',msg:'用户名已经存在'};
    }else {
      // 不存在该用户
      ctx.body = { code :'002',msg:'用户名不存在'};
    }
  },
  // 注册
  doRegister:async (ctx,next)=>{
    let {username,password,email,vcode} = ctx.request.body;
    if(vcode!= ctx.session.code){
      ctx.body ={ code :'002',msg:'验证码错误'};
      return ;
    }
    
    let doc =await userModels.checkUserName(username);
    console.log('验证码错误doc',doc);
    if(doc.length>0){
      // 存在该用户
      ctx.body = { code :'201',msg:'用户名已经存在'};
    }else {
      // 插入数据到数据库
      let res=await userModels.insertUserName(username,password,email);
      console.log(res.affectedRows);
      if(res.affectedRows==1){
        ctx.body = { code :'200',msg:'注册成功'};
      }else {
        ctx.body = { code :'002',msg:'注册失败'};
      }
    }
  },
  // 登录接口
  doLogin:async (ctx,next)=>{
    let {username,password} = ctx.request.body;
    let doc =await userModels.doLogin(username);
    
    if(password!=doc[0].password || doc.length==0){
      ctx.body = { code :'002',msg:'用户名或者密码错误'};
      return ;
    }
    
    if(password==doc[0].password){
      ctx.body = { code :'200',msg:doc};
      ctx.session.user=username;
      console.log('session =========',ctx.session.user);
      
      return ;
    }else {
      ctx.body = { code :'002',msg:'用户名或者密码错误'};
    }
  },
  // 获取二维码
  getPic:async (ctx,next)=>{
    let rand = parseInt(Math.random() * 9000 + 1000);
    ctx.session.code = rand
    let png = new captchapng(80, 30, rand); // width,height, numeric captcha
    console.log('验证码',ctx.session);
    ctx.body=png.getBuffer();
  }
}
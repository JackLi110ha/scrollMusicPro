const musicModels = require('../models/music')
const path = require('path')

function optMusic(ctx){
  let {title,singer,time} = ctx.request.body;
  
  let {file,filelrc} = ctx.request.files;

  // console.log('title,singer,time==========',title,singer,time);
  // console.log('file,filelrc=========',file,filelrc);
  let saveSingObj = {
    title,singer,time
  }

  if(filelrc) {
    saveSingObj.filelrc ='/public/files/'+path.parse(filelrc.path).base ;
  }
  if(file) {
    saveSingObj.file ='/public/files/'+path.parse(file.path).base ;
  }else {
    ctx.throw('音乐必须上传');
    return ;
  }
  saveSingObj.uid = 1;
  console.log('saveSingObj=========',  saveSingObj);

  return saveSingObj;

}

module.exports ={
  // 添加音乐
  async addMusic(ctx,next){
    console.log('添加音乐',ctx.request.body);
    
    let inserMusic=optMusic(ctx);
    let res=await musicModels.addMusic(inserMusic);
    ctx.body = { code :'200',msg:res};
  },
  // 添加音乐
  async updateMusic(ctx,next){
    let inserMusic=optMusic(ctx);
    let {id} = ctx.request.body;
    inserMusic = {...inserMusic,id}
    let res=await musicModels.updateMusic(inserMusic);
    if(res.affectedRows>0){
      ctx.body = { code :'200',msg:res};
    }else {
      ctx.body = { code :'002',msg:'更改音乐失败'};
    }
  },
  // 删除音乐
  async deletMusic(ctx,next){
    let {id} = ctx.request.body;
    let res=await musicModels.deletMusic(id);
    if(res.affectedRows>0){
      ctx.body = { code :'200',msg:res};
    }else {
      ctx.body = { code :'002',msg:'删除音乐失败'};
    }
  },
  // 获取音乐列表
  async getMusicList(ctx,next){
    // 暂时写死
    // let uid = ctx.session.user.uid;
    let uid = 1;
    let res=await musicModels.getMusicList(uid);
    console.log('音乐列表',ctx.session.user);
    ctx.render('index',{
      musicList:res,
      user:ctx.session.user
    })
  }
}
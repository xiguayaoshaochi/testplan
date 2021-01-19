<template>
  <div class="box" id="vue_login">
    <!-- v-if='loginState' -->   
    <div class="login_box" >
      <div class="login_txt">登录</div>
      <div class="username_box">
        <input type="text" name="username" id="username" placeholder="邮箱"  v-model="username" />
        <span>{{username_txt}}</span>
      </div>
      <div class="password_box">
        <input type="text" name="password" id="password" placeholder="密码" v-model="password" />
        <span>{{password_txt}}</span>
      </div>
      <div class="signIn_btn" @click=signIn>登录</div>
      <div class="ohterdoing">
        <router-link to="/register">注册</router-link>
        <router-link to="/forgetpd">忘记密码</router-link>
      </div>
    </div>
    <!-- <input type="file" value="" id="file" @change='changefile'> -->
  </div>
</template>

<script>
import app from '../js/global.js'
const db = app.database();
const loginState = app.auth().hasLoginState();
const _ = db.command;
export default {
  data() {
   return {
    username: '',
    password: '',
    username_txt: '',
    password_txt: '',
    loginState: '',  
   }
  },
  mounted() {
    if (loginState&&loginState._loginType) {
      auth.signOut();
    }    
  },
  methods: {
    signIn(){
      var _this  = this; 
      auth.signInWithEmailAndPassword(_this.username, _this.password).then((e) => {
        // 邮箱密码登录成功
        console.log('邮箱密码登录成功');
        // alert("邮箱密码登录成功")
        
         this.$message({
          showClose: true,
          message: '邮箱密码登录成功',
          type: 'success'
        });
        this.$router.push('/index')
        async function gname() {
          var getName = await db.collection("registerName").get().then((res)=>{
            var nameArr = res.data;
            console.log(nameArr,_this.username)
            if (nameArr && nameArr.find(obj => obj.username == _this.username)) {
              // this.username_txt = '此账号已经注册过,请直接登陆';
              console.log("此账号已记录过")
              
            } else {
              
              console.log("此账号记录成功")
              return true;
            }
          })
          
        }
        gname();
        
      }).catch((err)=>{
        var es = err.toString();
        if (es.indexOf('102003')>-1) {
          // 邮箱没有注册过+
          _this.username_txt ='邮箱还未注册，请先注册！'
        } else if (es.indexOf('100003') > -1) {
          //邮箱无效，请检查格式是否正确
          _this.username_txt = '邮箱无效，请检查格式是否正确！'
        } else if (es.indexOf('102001') > -1) {
          //密码不对
          _this.password_txt = '密码错误，请核对密码！'
        }
      });
    },
    changefile(){
      app
        .uploadFile({
          cloudPath: "images/img3.jpg",
          filePath: document.getElementById("file").files[0],
          onUploadProgress: function (progressEvent) {
            console.log(progressEvent);
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            
          }
        })
        .then((result) => {
          // 上传结果
          console.log(result,1)
          db.collection("imageData")
              .add({
                fileID: result.fileID,
                uid:auth.currentUser.uid,
                name:auth.currentUser.nickName,
                type: 'img',
                time: new Date()
              })
              // .get()
              .then((res) => { console.log(res.data) })
              .catch((e) => { console.log(e) });
        });

    },
    getImg(){
      db.collection("imageData").where({
        type:_.or(_.eq('img2'),_.eq('img3'))
      }).get().then((res)=>{
        console.log(res.data)
        app
        .getTempFileURL({
          fileList:  res.data
        })
        .then((res) => {
          res.fileList.forEach((el) => {
            if (el.code === "SUCCESS") {
              console.log(el.tempFileURL);
              document.getElementById("getImg").src = el.tempFileURL;
            } else {
              //获取下载链接失败

            }
          });
        });
      })
      
    }
  }
}

</script>

<style>

</style>
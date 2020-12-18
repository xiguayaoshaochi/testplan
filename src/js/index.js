import app from '../js/global.js'
import indexscss from '../css/index.scss'
import indexcss from '../css/index.css'
import Vue from "vue";


const db = app.database();
const auth = app.auth({
  persistence: "local" //用户显式退出或更改密码之前的30天一直有效
});


const loginState = app.auth().hasLoginState();
const _ = db.command;

console.log(loginState)

window.app = new Vue({
  el: "#vue_login",
  data: {
    username: '',
    password: '',
    username_txt: '',
    password_txt: '',
    loginState: '',
  },
  mounted() {
    console.log(app.auth().hasLoginState())
    this.loginState = false;
    if (loginState) {
      // 登录态有效
      this.loginState = true;
      const user = auth.currentUser;
      // user
      //   .update({
      //     nickName: "黄禧", // 昵称，不超过 45 个字符
      //     gender: "MALE", // 性别，取值仅限于 MALE、FEMALE、UNKNOWN
      //     avatarUrl: "", // 头像地址，不超过 255 个字符
      //     country: "中国", // 不超过 45 个字符
      //     province: "广东", // 不超过 45 个字符
      //     city: "广州" // 不超过 45 个字符
      //   })
      //   .then(() => {
      //     // 更新用户信息成功
      //     console.log('更新用户信息成功')
      //   });
      
    } else {
      // 没有登录态，或者登录态已经失效
    }
    
  },
  methods: {
    signIn(){
      var _this  = this;
      auth.signInWithEmailAndPassword(_this.username, _this.password).then((e) => {
        // 邮箱密码登录成功
        console.log('邮箱密码登录成功');
        alert("邮箱密码登录成功")
        async function gname() {
          var getName = await db.collection("name").get().then((res)=>{
            var nameArr = res.data;
            if (nameArr && nameArr.find(obj => obj.name == _this.username)) {
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
          cloudPath: "dirname/filename",
          filePath: document.getElementById("file").files[0],
          onUploadProgress: function (progressEvent) {
            console.log(progressEvent);
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            
          }
        })
        .then((result) => {
          // 上传结果
          console.log(result)
        });
      app
        .uploadFile({
          cloudPath: "dirname/filename1",
          filePath: document.getElementById("file").files[1],
          onUploadProgress: function (progressEvent) {
            console.log(progressEvent);
            var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);

          }
        })
        .then((result) => {
          // 上传结果
          console.log(result)
        });
    },
    getImg(){
      app
        .getTempFileURL({
          fileList: ["cloud://test-1gotf68l43775c18.7465-test-1gotf68l43775c18-1303960370/test1.png"]
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
    }
  }
})

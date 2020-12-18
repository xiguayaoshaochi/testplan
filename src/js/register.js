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

if (!loginState) {
  auth.anonymousAuthProvider()
    .signIn()
  
    // setInterval(() => {
    //   auth.signOut();
    //   console.log("out")
    // }, 10000);
}

var v_register = new Vue({
  el:'#v_register',
  data:{
    username: '',
    password: '',
    password2: '',
    username_txt: '',
    password_txt: '密码长度不小于 8 位，不大于 32 位，需要包含字母和数字',
    password_txt2: '',
    selected: '',
    selected_txt: '',
    options:null
  },
  mounted(){
    db.collection("name").get().then((res)=>{
      // 
      this.options = res.data
    })
    var _this = this;
    // db.collection("registerName")
    // .add({
    //   password: _this.password,
    //   username: _this.username,
    //   name: _this.selected
    // })
    //   // .get()
    //   .then((res) => { console.log(res.data) })
    //   .catch((e) => { console.log(e) });
  },
  methods:{
    checkUsername(){
      var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); 
      if (!this.username) {
        this.username_txt='请填写注册邮箱！'
      } else if (!reg.test(this.username)){
        this.username_txt = '邮箱格式填写有误！'
      }else{
        this.username_txt = '';
        return true;
      }
      
    },
    checkPassword() {
      if (!this.password) {
        this.password_txt = '请填写密码！'
      } else {
        this.password_txt = '';
        return true;
      }
    },
    checkSel() {
      if (!this.selected) {
        this.selected_txt = '请选择用户名!'
      } else {
        this.selected_txt = '';
        return true;
      }
    },
    checkPassword2() {
      if (!this.password2) {
        this.password_txt2 = '请再次填写密码！'
      } else if (this.password2 !== this.password) {
        this.password_txt2 = '两次输入密码不一致'
      }else {
        this.password_txt2 = '';
        return true;
      }
    },
    checkEmail(){
      var emailArr;
      return db.collection("resigterData").get().then(function (res) { 
        emailArr = res.data;
        if (emailArr&&emailArr.find(obj => obj.email == this.username)){
          console.log(1)
          this.username_txt = '此账号已经注册过,请直接登陆';
        }else{
          console.log(2)
          return true;
        }
      });      
    },
    registerSend(){
      var _this = this; 
      async function checkAll() {
        const cr = await _this.checkEmail();
        if (cr && _this.checkUsername() && _this.checkPassword() && _this.checkSel() && _this.checkPassword2() ) {
          console.log("success")
          auth.signUpWithEmailAndPassword(_this.username, _this.password).then(() => {
            console.log('注册成功');
            db.collection("registerName")
              .add({
                password: _this.password,
                username: _this.username,
                name: _this.selected,
                time: new Date()
              })
              // .get()
              .then((res) => { console.log(res.data) })
              .catch((e) => { console.log(e) });
            _this.password = _this.password2 = _this.username='';
            alert('注册成功,请登录注册邮箱激活账号');
          }).catch((err)=>{
            console.log(err)
            var es = err.toString();
            if (es.indexOf('102002') > -1){
              _this.username_txt = '邮箱已经注册，请直接登录！';
            } else if (es.indexOf('100003') > -1) {
              _this.username_txt = '请检查邮箱格式！';
            }else{
              _this.password_txt = '密码长度不小于 8 位，不大于 32 位，需要包含字母和数字';
            } 
            
          })
        }
      }
      checkAll();
    }
  }
})
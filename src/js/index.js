import app from '../js/global.js'
import indexscss from '../css/index.scss'
import indexcss from '../css/index.css'
import Vue from "vue";
import router from "../js/router.js";
import appvue from "../js/app.vue";

const db = app.database();
const loginState = app.auth().hasLoginState();
const _ = db.command;
const auth = app.auth({
  persistence: "local" //用户显式退出或更改密码之前的30天一直有效
});




console.log(loginState)

var vm = new Vue({
  el:'#app',
  render(h) {
    return h(appvue)
  },
  router
})



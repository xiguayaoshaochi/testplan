import app from './global.js'
import indexscss from '../css/index.scss'
import indexcss from '../css/index.css'
import Vue from "vue";
import router from "./router.js";
import appvue from "../js/app.vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// console.log(ElementUI)
const db = app.database();
const loginState = app.auth().hasLoginState();
const _ = db.command;
const auth = app.auth({
  persistence: "local" //用户显式退出或更改密码之前的30天一直有效
});







var vm = new Vue({
  el: '#app',
  render(h) {
    return h(appvue)
  },
  router
})

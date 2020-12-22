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



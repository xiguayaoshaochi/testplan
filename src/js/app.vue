<template>
  <div>
    <el-menu v-if="this.getState" 
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">Google</template>
        <el-menu-item index="1-1">置顶推广图</el-menu-item>
        <el-menu-item index="1-2">产品说明</el-menu-item>
        <el-menu-item index="1-3">icon图标</el-menu-item>
        <el-menu-item index="1-4">商店五图/预览视频</el-menu-item>
        <el-menu-item index="1-5">置顶图</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">Facebook</template>
        <el-menu-item index="2-1" @click="jump('facebookIndex')">置顶页面/视频</el-menu-item>
        <el-menu-item index="2-2">粉丝页头像</el-menu-item>
        <el-menu-item index="2-3">活动文案</el-menu-item>
        <el-menu-item index="2-4">活动图/视频/360图/H5</el-menu-item>
        <el-menu-item index="2-5" @click="jump('show')">推广形式(视频/图片/轮播图)</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">IOS</template>
        <el-menu-item index="3-1">App排行榜</el-menu-item>
        <el-menu-item index="3-2">产品介绍页(产品说明/五图/介绍视频)</el-menu-item>
        <el-menu-item index="3-3">置顶图/推荐页</el-menu-item>
        <el-menu-item index="3-4">界面效果</el-menu-item>
      </el-submenu>
      <el-menu-item index="4" @click="dialogVisible = true">注销登录</el-menu-item>
      <span id="topbar_name">用户：{{nickname}}</span>
    </el-menu>
    <router-view></router-view>

    

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>确定要注销登录吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"  @click="signOut">确 定</el-button>
      </span>
    </el-dialog>
  </div>
  
</template>

<script>
import {app, auth} from '../js/global.js';
const db = app.database();
const _ = db.command;
import Vue from "vue";
import { mapState, mapGetters,mapMutations  } from 'vuex';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
export default {
 data() {
   return {
    activeIndex: '1',
    dialogVisible: false,
    loginState:'',
    nickname:'',

   }
 },
 computed:{
   ...mapGetters(['getState']),
 },
 mounted() {
   
   this.loginState =  app.auth().hasLoginState();
   this.setloginState({ state: this.loginState });
   if (this.loginState) {
     this.nickname = this.loginState.user.nickName;
   }
  //  console.log(this.loginState)
 },
 methods: {
    ...mapMutations(['setloginState']),
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    jump(address){
      console.log(this.$router)
      this.$router.replace({path:'/'+address});
    },
    signOut(){
      this.dialogVisible = false;
      auth.signOut();
      this.loginState=this.getState;
      this.$router.push('/login');
      this.setloginState({ state: null })
    },

 },
}
</script>

<style lang="scss" scoped>
  #topbar_name{
    float: right;
    margin-right: 20px;
    font-size: 14px;
    color: #fff;
    height: 60px;
    line-height: 60px;
  }

  // #drawerBox .el-row{
  //   margin-bottom: 10px;
  // }
  .el-menu{
    position: relative;
  }
</style>
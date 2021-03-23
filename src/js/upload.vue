<template>
  <div class="start_box">
    <el-upload
      class="upload-demo"
      drag
      action="none" 
      :http-request="uploadSectionFile"
      list-type="text"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传图片文件，且不超过100M</div>
    </el-upload>
  </div>
</template>

<script>
import {app, auth} from './global.js';
import { mapState, mapGetters,mapMutations  } from 'vuex';
const db = app.database();
const loginState = app.auth().hasLoginState();
const _ = db.command;
// console.log(loginState)
export default {
 data() {
   return {
     data1:'1234564',
     fileList:[

     ],
   }
 },
  computed:{
    ...mapGetters(['getState']),
  },
 mounted() {
  //  this.setloginState({ state: app.auth().hasLoginState() })
  //  this.loginState = this.getState;
  console.log(this.getState);
   if (app.auth().hasLoginState()==null) {
      this.$router.push('/login');
    } 
   if (loginState&&loginState.isAnonymousAuth) {
      auth.signOut();
    } 
 },
 methods: {
   fileSuccess(){
     console.log('success')
   },
    uploadSectionFile(params) {
      var _this = this;
      const file = params.file;
      var  fileType = file.type;
      var  fileName = new Date().getTime()+file.name;
      console.log(file,fileName,fileType);
      if (fileType.indexOf("image") == -1) {
        this.$message.error("文件格式需为图片");
        return;
      }
      if (file.size / 1024 / 1024 > 100) {
        this.$message.error("文件大小需小于100M!");
        return;
      }
      app
      .uploadFile({   
        cloudPath: 'images/'+fileName,
        filePath: file,
        onUploadProgress: function (progressEvent) {
          console.log(progressEvent);
          var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        }
      })
      .then((result) => {
        // 上传结果
        let url = window.URL || window.webkitURL;
        let img = new Image(); //手动创建一个Image对象
        img.src = url.createObjectURL(file);//创建Image的对象的url
        img.onload = function () {
          console.log('height:' + this.height + '----width:' + this.width)
          var res = [];
          res.push({url:result,time:new Date().getTime(),width:this.width,height:this.height});
          _this.$emit('changeUpload',res);
          _this.$message.success('上传成功!');
          console.log(res,1)
          db.collection("imageData")
            .add({
              fileID: result.fileID,
              uid:auth.currentUser.uid,
              name:auth.currentUser.nickName,
              type: 'img',
              time:  new Date().getTime(),
              width:this.width,
              height:this.height
            })
            .then((res) => { console.log(res.data) })
            .catch((e) => { console.log(e) });
        }

      }).catch((e) => { this.$message.error(e); });
    }
 },
 
}
</script>

<style>

</style>
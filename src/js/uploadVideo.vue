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
      <div class="el-upload__tip" slot="tip">只能上传视频文件，且不超过100M</div>
    </el-upload>
    <!-- <video id='sv'></video>
    <canvas id='sc'></canvas> -->
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
      /**
      url(为.MP4的视频链接)
      调用方式:
      videoCutOutImg(url).then(res => {
        console.log(res);// 返回截取到的视频帧图片
      })
    */
   // 判断浏览器是否支持 createObjectURL api
    getObjectURL(file) {  
      var url = null;   
      if (window.createObjectURL!=undefined) {  
        url = window.createObjectURL(file) ;  
      } else if (window.URL!=undefined) { // mozilla(firefox)  
        url = window.URL.createObjectURL(file) ;  
      } else if (window.webkitURL!=undefined) { // webkit or chrome  
        url = window.webkitURL.createObjectURL(file) ;  
      }  
      return url ;  
    },
    videoCutOutImg (url, frames = 5) {
      let video = document.createElement('video')
      let slide = 0.25
      video.crossOrigin = 'anonymous'
      video.setAttribute('src', url)
      video.currentTime = frames // 帧数，取5帧吧，第一帧可能会是黑色，帧数自定义取
      return new Promise((resolve, reject) => {
        video.addEventListener('loadeddata', function () {
          let canvas = document.createElement('canvas')
          canvas.width = video.videoWidth * slide
          canvas.height = video.videoHeight * slide
          canvas
            .getContext('2d')
            .drawImage(video, 0, 0, canvas.width, canvas.height)
          resolve([canvas.toDataURL('image/png'),canvas.width,canvas.height])
          
        })
      })
    },
   fileSuccess(){
     console.log('success')
   },
    uploadSectionFile(params) {
      var _this = this;
      const file = params.file;
      var  fileType = file.type;
      var  fileName = new Date().getTime()+file.name;
      console.log(file,fileName,fileType);
      if (fileType.indexOf("video") == -1) {
        this.$message.error("文件格式需为视频!");
        return;
      }
      if (file.size / 1024 / 1024 > 100) {
        this.$message.error("文件大小需小于100M!");
        return;
      }
      app
      .uploadFile({   
        cloudPath: 'video/'+fileName,
        filePath: file,
        onUploadProgress: function (progressEvent) {
          console.log(progressEvent);
          var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        }
      })
      .then((result) => {
        // 上传结果
        console.log(result)
        var videoUrl = _this.getObjectURL(file);
        _this.videoCutOutImg(videoUrl).then(res => {
          var ress = [];
          ress.push({url:result,time:new Date().getTime(),width:res[1]*4,height:res[2]*4,poster:res[0]});
          _this.$emit('changeUpload',ress);
          _this.$message.success('上传成功!');
          // console.log(res[0]);// 返回截取到的视频帧图片
          db.collection("videoData")
            .add({
              fileID: result.fileID,
              uid:auth.currentUser.uid,
              name:auth.currentUser.nickName,
              type: 'video',
              time:  new Date().getTime(),
              width:res[1],
              height:res[2],
              poster:res[0]
            })
            .then((res) => { console.log(res.data) })
            .catch((e) => { console.log(e) });
        });
      }).catch((e) => { this.$message.error(e); });
    }
 },
 
}
</script>

<style>

</style>
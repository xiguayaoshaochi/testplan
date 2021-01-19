<template>
  <div class="start_box">
    <el-upload
      class="upload-demo"
      drag
      action="none" 
      :on-success='fileSuccess'
      :http-request="uploadSectionFile"
      multiple>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
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
     data1:'123',
   }
 },
 mounted() {
   if (loginState&&loginState._loginType) {
      auth.signOut();
    } 
 },
 methods: {
   fileSuccess(){
     console.log(1)
   },
    uploadSectionFile(params) {
          const file = params.file;
          var  fileType = file.type;
          var  fileName = file.name;
          console.log(file);
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
            // isImage = fileType.indexOf("image") != -1,
            // isLt2M = file.size / 1024 / 1024 < 2;
          // 这里常规检验，看项目需求而定
          // if (!isImage) {
          //   this.$message.error("只能上传图片格式png、jpg、gif!");
          //   return;
          // }
          // if (!isLt2M) {
          //   this.$message.error("只能上传图片大小小于2M");
          //   return;
          // }
          // 根据后台需求数据格式
          // const form = new FormData();
          // // 文件对象
          // form.append("file", file);
          // // 本例子主要要在请求时添加特定属性，所以要用自己方法覆盖默认的action
          // form.append("clientType", 'xxx');
          // // 项目封装的请求方法，下面做简单介绍
          // imageUpload(form)
          //   .then(res => {
          //    //自行处理各种情况
          //     const code = res && parseInt(res.code, 10);
          //     if (code === 200) {
          //       // xxx
          //     } else {
          //       // xxx
          //     }
          //   })
          //   .catch(() => {
          //     // xxx
          //   });
    }
 },
 
}
</script>

<style>

</style>
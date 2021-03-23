<template>
<div id="sidebar">
  <el-button @click="getImg" type="primary" style="position:relative;z-index:10;">选择图片</el-button>
  <el-drawer id="drawerBox"
    title="上传和选择图片"
    :visible.sync="drawer"
    :direction="'ltr'"
    :with-header="false">
    <upload @changeUpload="changeUpload"></upload>
    <el-row :gutter="20">
      <el-col :span="6" v-for="(item,index) in imgSrcList" :key="item.id" @mouseenter.native="mouseEnter(index)"  @mouseleave.native="mouseLeave(index)" >
        <div class="demo-image__preview" :ref="itemName">
          <span id="wh">{{item.width}}*{{item.height}}</span>
          <el-image  @click='changeUpload(item)'
            :src="item.url" 
            :fit="'contain'"
            >
            <div slot="placeholder" class="image-slot">
              加载中<span class="dot">...</span>
            </div>
          </el-image>
        </div>
      </el-col>
    </el-row> 
    <el-pagination
      small
      background
      @current-change="currentChange"
      layout="total,prev, pager, next,jumper"
      :page-size="pageLimit"
      :total="totalNum">
    </el-pagination>
  </el-drawer>

</div>
</template>
<script>
import {app, auth} from '../js/global.js';
import upload from './upload.vue'
const db = app.database();
const _ = db.command;
export default {
  data() {
    return {
      drawer: false,
      imgUrl:'',
      imgSrcList:[],
      active:'',
      itemName:'itemName',
      pageNum:1,
      pageLimit:16,
      userId: '',
      totalNum:0,
    }
  },
  mounted() {
    this.loginState =  app.auth().hasLoginState();
    this.userId = this.loginState.user.uid;
    this.getTotal();
  },
  watch:{

  },
  components: {upload},
  methods: {
    changeUpload(src) {
      var _this = this;
      console.log(src.constructor==Array,src)
      if (src.constructor==Array) {
        // _this.getImg();
        var tc=src[0].url;
        app
          .getTempFileURL({
            fileList: [tc.fileID]
          })
          .then((res) => {
            // _this.$emit('changeUpload',res.fileList[0].download_url);
            res.fileList.forEach((el) => {
              if (el.code === "SUCCESS") {
                this.$emit('changeUpload',el.tempFileURL);
                this.getTotal();
                if (_this.pageNum==1) {
                  _this.imgSrcList.pop();
                  _this.imgSrcList.unshift({url:el.tempFileURL,time:src[0].time,width:src[0].width,height:src[0].height});
                }
                console.log(el.tempFileURL)
              } else {
                //获取下载链接失败
              }
            });
          });
      }else{
        this.$emit('changeUpload',src.url);
      }
      
      // console.log("childmethod")
    },
    currentChange(currentPage){
      this.pageNum = currentPage;
      this.getImg();
      console.log(this.pageNum)  //点击第几页
    },
    getTotal(){
      var _this = this;
      db.collection("imageData").where({_openid: _.eq(_this.userId)}).get().then((res)=>{
        _this.totalNum = res.data.length;
        console.log(_this.totalNum)
        return res.data.length;
      })
    },
    getImg(){
      var _this = this;
      this.drawer = true;
      _this.imgSrcList=[];
      async function getData() {
        var imgData = await db.collection("imageData").where({_openid: _.eq(_this.userId)})
        .skip((_this.pageNum-1)*_this.pageLimit).limit(_this.pageLimit).orderBy("time", "desc")
        .get().then((res)=>{
          return res.data;
        })
        
        for (let index = 0; index < imgData.length; index++) {
          const element = imgData[index];                         
          app
          .getTempFileURL({
            fileList: [element.fileID]
          })
          .then((res) => {
            // _this.$emit('changeUpload',res.fileList[0].download_url);
            res.fileList.forEach((el) => {
              if (el.code === "SUCCESS") {
                _this.imgSrcList.push({url:el.tempFileURL,time:imgData[index].time,width:imgData[index].width,height:imgData[index].height});
                // console.log(el.tempFileURL)
              } else {
                //获取下载链接失败
              }
              //图片按照日期远近排序
              _this.imgSrcList.sort((a,b)=>{
                var timea = a.time;
                var timeb = b.time;
                if (timea>timeb) {
                  return -1;
                }else if(timea<timeb){
                  return 1;
                }else{
                  return 0;
                }                  
              })
            });
          });
        }
      }
      getData();
    },
    uploadTh(){

    },
    mouseEnter(id){
      // console.log(id,this.$refs.itemName[id].children[0])
      this.$refs.itemName[id].children[1].style.border="solid 1px #59f137";
    },
    mouseLeave(id){
      this.$refs.itemName[id].children[1].style.border="solid 1px #333";
    },
    
  },
}
</script>
<style lang="scss">
#sidebar {
  #drawerBox .el-row{
    margin-bottom: 10px;
  }
  .el-image-viewer__wrapper{
    z-index: 999999;
  }
  .el-image{
    min-height: 100px;
    max-height: 100px;
    overflow: hidden;
    border: 1px solid #333;
    cursor: pointer;
  }

  .demo-image__preview  img{
    width: 100px;
    height: 100px;
    object-position:50% 50%;  
  }
  .el-row{
    min-height: 450px;
    max-height: 490px;
    overflow:auto;
  }

  .el-upload-list{
    max-height: 135px;
    overflow:auto;
  }
  .el-col-6{
    display: flex;
    margin-bottom: 10px;
  }
  
  .demo-image__preview{
    margin: 0 auto;
    position: relative;
  }

  #wh{
    position: absolute;
    display: block;
    width: 100%;
    z-index: 2;
    font-size: 12px;
    /* background: #333; */
    text-align: center;
    bottom: -10px;
    box-sizing: border-box;
  }
}
</style>
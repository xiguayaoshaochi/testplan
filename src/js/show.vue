<template>
    <div class="box top61" id="box">
    <div class="canvas_box pages" id="canvas_box">

      <canvas id="canvas" width="" height=""></canvas>
    </div>
    <div class="change_box">
       <input type="file" name="pic1" value="" @change="changeUpload($event)" class="upload-pic-input">
       <div id="reset" >重置图片位置</div>
      <div id="changeModel1" class="changemodel focus">1000*1000</div>
      <div id="changeModel2" class="changemodel">1200*628</div>
      <div id="changeModel3" class="changemodel">1280*720</div>
      <div id="changeModel4" class="changemodel">750*750</div>

    </div>
    <div id='dropper' @drop.prevent="drop($event)" @dragover.prevent></div>
    <sidebar @changeUpload="changeUpload"></sidebar>
  </div>
</template>

<script>

import {app, auth} from '../js/global.js';
import { mapState, mapGetters,mapMutations  } from 'vuex';
import '../js/createModules.js';
import 'yuki-createjs/lib/easeljs-0.8.2.combined';
import 'yuki-createjs/lib/tweenjs-0.6.2.combined';
import $ from 'jquery';
import sidebar from './sidebar.vue'
export default {
  data() {
    return {

    }
  },
  computed:{
    ...mapGetters(['getState']),
  },
  mounted() {
      start();
  window.model = 1;
  function start(){
    window.canvas = document.getElementById("canvas");
    window.stage = new createjs.Stage(window.canvas);
    window.container0 = new createjs.Container();
    window.container1 = new createjs.Container();
    window.container2 = new createjs.Container();
    window.container3 = new createjs.Container();
    window.container4_1 = new createjs.Container();
    window.container4_2 = new createjs.Container();
    window.container5_1 = new createjs.Container();
    window.container5_2 = new createjs.Container();
    window.containerAll = new createjs.Container();
    window.containerAll2 = new createjs.Container();
    window.containerAll3 = new createjs.Container();
    window.containerAll4 = new createjs.Container();

    var art_size = 640;
    var stageWidtha = document.documentElement.clientWidth;
    var stageScalea = stageWidtha / art_size;
    var W = 1280;
    var H = 2773;
    window.getCS = document.getElementById("canvas");
    window.art_sizex = W; window.art_sizey = H;

    canvas.width = art_sizex*1.2;
    canvas.height = art_sizex*2.2 * 1.2;
    getCS.style.width = art_sizex/3 * 1.2+'px';
    getCS.style.height = art_sizex/3 * 2.2 * 1.2+ 'px';

    // canvas.width = art_sizex;
    // canvas.height = art_sizex*2.2;
    // getCS.style.width = art_sizex/3+'px';
    // getCS.style.height = art_sizex/3 * 2.2+ 'px';
    window.stage.addChild(containerAll, containerAll2, containerAll3, containerAll4);
    containerAll3.addChild(container1, container0);
    containerAll2.addChild(container3,container2);
    containerAll.addChild(container4_2,container4_1);
    containerAll4.addChild(container5_1, container5_2);
    createjs.Touch.enable(window.stage);
    // createjs.Ticker.paused = 0;
    
    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    createjs.Ticker.setFPS(60);

    createjs.Ticker.addEventListener("tick", stageBreakHandler);
    // stageBreakHandler();
    window.stage.alpha=0;
  

  window.savex = stage.x;window.savey = stage.y;
  stage.regX = stage.regY = W/3;
  stage.x = W/3+stage.x;
  stage.y = W/3+stage.y;
  stage.scaleX=stage.scaleY=1;
  var img = new Image();
  img.src='../images/bg1000_1000.jpg';
  img.onload=function(){
    addBitmap('bg1000_1000', img, 0, 0, "addArr6");
    container4_2.addChild(wb.bg1000_1000);
  }
  containerAll.scaleX = containerAll.scaleY = 1.2;

  var img1 = new Image();
    img1.src = '../images/bg1200_628.jpg';
    img1.onload = function () {
      addBitmap('bg1200_628', img1, 0, 0, "addArr6");
      container3.addChild(wb.bg1200_628);
    }
  
  var img2 = new Image();
    img2.src = '../images/bg1280_720.jpg';
    img2.onload = function () {
      addBitmap('bg1280_720', img2, 0, 0, "addArr6");
      container1.addChild(wb.bg1280_720);
    }

    var img4 = new Image();
    img4.src = '../images/bg750_750.jpg';
    img4.onload = function () {
      addBitmap('bg750_750', img4, 0, 0, "addArr6");
      container5_1.addChild(wb.bg750_750);
    }
    containerAll4.scaleX = containerAll4.scaleY = 1.6;
  window.stage.alpha=1;
  containerAll2.alpha = 0; containerAll3.alpha=0; containerAll4.alpha = 0;




  }




  window.transObj = {
    o: null,
    start: function (obj) {
      var _this = this;
      _this.destory();
      _this.o = obj;
      _this.o.alpha = 1;
      // _this.o.scaleY=_this.o.scaleX=1;
      // console.log(transObj.o);
      // $("#change_left").bind("click", _this.transLeft);
      // $("#change_right").bind("click", _this.transRight);
      // $("#change_up").bind("click", _this.transUp);
      // $("#change_down").bind("click", _this.transDown);
      // console.log($(document));
      $(document).keydown(function (event) {
        var keyNum = event.which;  //获取键值
        switch (keyNum) { //判断按键
          case 37: _this.transLeft(); break;//左
          case 38: _this.transDown(); break;//上
          case 39: _this.transRight(); break;//右
          case 40: _this.transUp(); break;//下
          case 100: _this.transSmall(); break;//小键盘4
          case 102: _this.transBig(); break;//小键盘6
          default:
            break;
        }
      });
      _this.move();
      _this.output();
    },
    transLeft: function () {
      transObj.o.x--;
      transObj.output();
    },
    transRight: function () {
      transObj.o.x++;
      transObj.output();
    },
    transUp: function () {
      transObj.o.y++;
      transObj.output();
    },
    transDown: function () {
      transObj.o.y--;
      transObj.output();
    },
    transSmall: function () {
      transObj.o.scaleX = transObj.o.scaleY -= 0.1;
      transObj.output();
    },
    transBig: function () {
      transObj.o.scaleX = transObj.o.scaleY += 0.1;
      transObj.output();
    },
    move: function () {
      var _this = this;
      var dragObj = transObj.o;
      dragObj.addEventListener("mousedown", function (e) {
        var x1 = stage.mouseX;
        var y1 = stage.mouseY;
        var x2 = dragObj.x;
        var y2 = dragObj.y;
        stage.addEventListener('stagemousemove', function (e) {
          dragObj.x = stage.mouseX - (x1 - x2);
          dragObj.y = stage.mouseY - (y1 - y2);

          if (dragObj.getBounds() == null && dragObj.graphics.command.radius) {
            dragObj_mid_x = dragObj.x + dragObj.graphics.command.radius / 2;
            dragObj_mid_y = dragObj.y + dragObj.graphics.command.radius / 2;
            return false;
          }
          // dragObj_mid_x = dragObj.x+dragObj.getBounds().width/2;
          // dragObj_mid_y = dragObj.y+dragObj.getBounds().height/2;
        });
        stage.addEventListener('stagemouseup', function (e) {
          // dragObj.x = x2;
          // dragObj.y = y2;
          _this.output();
          e.target.removeAllEventListeners();
        });
      });
    },
    output: function () {
      // console.log(transObj.o)
      var transObjox = transObj.o.x.toFixed(1);
      var transObjoy = transObj.o.y.toFixed(1);
      if (transObj.o.sourceRect == undefined && transObj.o.spriteSheet == undefined) {
        console.log(outName,
          "x:" + (transObjox - transObj.o.getBounds().width / (1 / (transObj.o.regX / transObj.o.getBounds().width))).toFixed(1),
          ",y:" + (transObjoy - transObj.o.getBounds().height / (1 / (transObj.o.regY / transObj.o.getBounds().height))).toFixed(1),
          (transObjox - transObj.o.getBounds().width / (1 / (transObj.o.regX / transObj.o.getBounds().width))).toFixed(1)
          + "," + (transObjoy - transObj.o.getBounds().height / (1 / (transObj.o.regY / transObj.o.getBounds().height))).toFixed(1)
          , "xx:" + transObjox, ",yy:" + transObjoy, "scale" + transObj.o.scaleX
        );
        return false;
      }
      var outName = transObj.o.name;
      if (transObj.o.regX == 0 && transObj.o.regY == 0) {
        console.log(outName, "x:" + transObjox, ",y:" + transObjoy, transObjox + "," + transObjoy);
      } else if (transObj.o.spriteSheet != undefined) {
        console.log(outName, "x:" + transObjox, ",y:" + transObjoy, transObjox + "," + transObjoy, "scale" + transObj.o.scaleX);
      } else {
        console.log(outName,
          "x:" + (transObjox - transObj.o.getBounds().width / (1 / (transObj.o.regX / transObj.o.getBounds().width))).toFixed(1),
          ",y:" + (transObjoy - transObj.o.getBounds().height / (1 / (transObj.o.regY / transObj.o.getBounds().height))).toFixed(1),
          (transObjox - transObj.o.getBounds().width / (1 / (transObj.o.regX / transObj.o.getBounds().width))).toFixed(1)
          + "," + (transObjoy - transObj.o.getBounds().height / (1 / (transObj.o.regY / transObj.o.getBounds().height))).toFixed(1)
          , "xx:" + transObjox, ",yy:" + transObjoy, "scale" + transObj.o.scaleX
        );
      }

    },
    destory: function () {
      // $("#change_left").unbind();
      // $("#change_right").unbind();
      // $("#change_up").unbind();
      // $("#change_down").unbind();
    }
  }
  

  $("#reset").bind("click",function(){
    wb.bg.x= window.pox; wb.bg.y = window.poy;
  })

  $("#changeModel1").bind("click", function () {
    $(".changemodel").attr("class","changemodel");
    $(this).addClass("focus");
    model=1;
    containerAll.alpha=1; containerAll2.alpha = 0; containerAll3.alpha = 0;containerAll4.alpha=0;
  })

  $("#changeModel2").bind("click", function () {
    $(".changemodel").attr("class", "changemodel");
    $(this).addClass("focus");
    model = 2;
    containerAll.alpha = 0; containerAll2.alpha = 1; containerAll3.alpha = 0; containerAll4.alpha = 0;
  })

  $("#changeModel3").bind("click", function () {
    $(".changemodel").attr("class", "changemodel");
    $(this).addClass("focus");
    model = 3;
    containerAll.alpha = 0; containerAll2.alpha = 0; containerAll3.alpha = 1;containerAll4.alpha=0;
  })

  $("#changeModel4").bind("click", function () {
    $(".changemodel").attr("class", "changemodel");
    $(this).addClass("focus");
    model = 4;
    containerAll.alpha = 0; containerAll2.alpha = 0; containerAll3.alpha = 0; containerAll4.alpha = 1;
  })

  },
  components: {sidebar},
  methods: {
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
    changeUpload(e){
      var _this = this;
      
      let src='';
      if(e.preventDefault){
        var val = e.target.files[0];
        src = this.getObjectURL(val);
      }else{
        src = e;
      }
      console.log(src);
      var img = new Image();
      img.src = src;
      img.onload=function(){
        addBitmap('bg',src,0,0,"addArr6");
        if(model==1){
          container4_1.removeChild(container4_1.children[0]);
          container4_1.addChild(wb.bg);
          console.log(wb.bg)
          transObj.start(wb.bg);
          var regx = 0.5; var regy = 0.5;
          var w_ = wb.bg.getBounds().width; var h_ = wb.bg.getBounds().height;
          wb.bg.regX = w_ * regx;
          wb.bg.x = wb.bg.x + w_ * regx + (art_sizex - w_) / 2;
          wb.bg.regY = h_ * regy;
          wb.bg.y = wb.bg.y + h_ * regy + (art_sizex - h_) / 2;
          wb.bg.x = 499; wb.bg.y = 1342;
          window.pox = wb.bg.x; window.poy = wb.bg.y;
        }else if (model == 2){
          container2.removeChild(container2.children[0]);
          container2.addChild(wb.bg);
          console.log(wb.bg)
          transObj.start(wb.bg);
          var regx = 0.5; var regy = 0.5;
          var w_ = wb.bg.getBounds().width; var h_ = wb.bg.getBounds().height;
          wb.bg.regX = w_ * regx;
          wb.bg.x = wb.bg.x + w_ * regx + (art_sizex - w_) / 2;
          wb.bg.regY = h_ * regy;
          wb.bg.y = wb.bg.y + h_ * regy + (art_sizex - h_) / 2;
          wb.bg.x = 601; wb.bg.y = 1194;
          window.pox = wb.bg.x; window.poy = wb.bg.y;
        } else if (model == 3) {
          container0.removeChild(container0.children[0]);
          container0.addChild(wb.bg);
          console.log(wb.bg)
          transObj.start(wb.bg);
          var regx = 0.5; var regy = 0.5;
          var w_ = wb.bg.getBounds().width; var h_ = wb.bg.getBounds().height;
          wb.bg.regX = w_ * regx;
          wb.bg.x = wb.bg.x + w_ * regx + (art_sizex - w_) / 2;
          wb.bg.regY = h_ * regy;
          wb.bg.y = wb.bg.y + h_ * regy + (art_sizex - h_) / 2;
          wb.bg.x = 601; wb.bg.y = 1194;
          window.pox = wb.bg.x; window.poy = wb.bg.y;
        } else if (model == 4) {
          container5_2.removeChild(container5_2.children[0]);
          container5_2.addChild(wb.bg);
          console.log(wb.bg)
          transObj.start(wb.bg);
          var regx = 0.5; var regy = 0.5;
          var w_ = wb.bg.getBounds().width; var h_ = wb.bg.getBounds().height;
          wb.bg.regX = w_ * regx;
          wb.bg.x = wb.bg.x + w_ * regx + (art_sizex - w_) / 2;
          wb.bg.regY = h_ * regy;
          wb.bg.y = wb.bg.y + h_ * regy + (art_sizex - h_) / 2;
          wb.bg.x = 375; wb.bg.y = 1007;
          window.pox = wb.bg.x; window.poy = wb.bg.y;
        }
      }
      // if(src){
      //   $(this).parent().find('img').attr('src',src);

      // }else{
      //   $(this).parent().find('img').attr('alt',this.files[0]);
      // }
     
      
      
      setTimeout(function(){
        
        
      },500)
    },
    drop(ev){
      var _this = this;
      var oFile = ev.dataTransfer.files[0];
      var reader = new FileReader();
      //读取成功
      reader.onload = function () {
        // console.log(reader.result);
        var src = reader.result;
        _this.changeUpload(src);
      };
      reader.onprogress = function (ev) {
        var scale = ev.loaded / ev.total;
        if (scale >= 0.5) {
          // alert(1);
          reader.abort();
        }
        // oM.value = scale * 100;
      };
      reader.readAsDataURL(oFile, 'base64');
      return false;
    },
  }
}
</script>

<style>

.pages{ 
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
}

.changemodel{
  width:70px;
  height:70px;
  border-radius: 50%;
  line-height: 70px;
  text-align: center;
  background: #027B7E;
  font-size: 14px;
  position: absolute;
  top: 0;
  cursor: pointer;
  pointer-events: auto;
}

.changemodel.focus{
  background: #fcff00;
}

#changeModel1{
  right: 14%;
}#changeModel2{
  right: 7%;
}#changeModel3{
  right: 0%;
}#changeModel4{
  right: 21%;
}

.box{
  width: 640px;
  height: 100%;
  transform-origin: left top;
  -webkit-transform-origin: left top;
}

#canvas_box{
    width: 100%;
    height: 100%;
    /* transform: translate(-50%,-50%);
    left: 50%;
    top: 50%; */
    background:#f3f3f3;
    z-index: 2;position: absolute;
}

#canvas{
  margin: 0 auto; 
  display: block; 
}

.change_box{
  position: absolute;left: 0px;top: 0;z-index: 100;width: 100%;height: 100%;pointer-events: none;opacity: 0.5;position:absolute;z-index: 4;
}

.upload-pic-input{
  pointer-events: auto;width: 100px;height: 40px;opacity: 0;cursor:pointer 
}

#reset{
  cursor:pointer;position: absolute;right: 0;top: 0%;width: 100px;height: 40px;background: #000;
  color: #fff;text-align: center;line-height: 40px;font-size: 16px;opacity: 0.8;pointer-events: auto;display: none;
}

#dropper{
  width: 100%;height: 100%;position:absolute;z-index: 3;top:0%
}

</style>

import 'yuki-createjs/lib/easeljs-0.8.2.combined';
import 'yuki-createjs/lib/tweenjs-0.6.2.combined';
var cjs = createjs;
window.wsp = window.sprite || {};
window.wb = window.bitmaps || {};
window.stage = new createjs.Stage(window.canvas);

createjs.Touch.enable(window.stage);
createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
createjs.Ticker.setFPS(60);
window.stageBreakHandler = (event) => {
  if (event.paused != true) {
    window.stage.update(); //刷新舞台
  }
}
createjs.Ticker.addEventListener("tick", stageBreakHandler);
createjs.MotionGuidePlugin.install();



window.canvas = document.getElementById("canvas");
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



createjs.MotionGuidePlugin.install();
// stage.enableMouseOver(10);
window.stage.addChild(container4_2, container0);

window.stage.alpha = 0;




let verifyStatus = () => {
  if (stage.alpha != 0) {
    return true;
  } else {
    return false;
  }
}


createjs.setTimeout = function (cb, delay) {
  var tween = createjs.Tween.get({})
    .wait(delay)
    .call(function () {
      cb && cb();
      createjs.clearTimeout(tween);
    });
  return tween;
}



// 定制一个 clearTimeout 方法
createjs.clearTimeout = function (timeout) {
  // 删除动画 
  createjs.Tween.removeTweens(timeout.target);
  // 删除实例
  timeout = undefined;
  return true;
}

// 定制一个 setInterval 方法
createjs.setInterval = function (cb, delay) {
  var tween = createjs.Tween.get({})
    .wait(delay)
    .call(function () {
      cb && cb();
    });
  tween.loop = true;
  return tween;
}
// 定制一个 clearInterval 方法
createjs.clearInterval = function (interval) {
  // 删除动画
  createjs.Tween.removeTweens(interval.target);
  // 删除实例
  interval = undefined;
  return true;
}

window.setTimeouc = createjs.setTimeout;
window.clearTimeout1 = createjs.clearTimeout;
window.setInterval1 = createjs.setInterval;
window.clearInterval1 = createjs.clearInterval;



window.bitmaps = window.bitmaps || {};
window.sprite = window.sprite || {};


window.randomsort = (a, b) => {
  return Math.random() > .5 ? -1 : 1;
  //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
}


// 取两个数之间的随机数
window.random1 = (min, max) => {
  if (!max) {
    max = min;
    min = 0;
  }

  return min + Math.floor(Math.random() * (max - min + 1));
}


window.getNum = (con1, con2) => {
  var rand = random1(con1[0], con2[1]);

  if ((rand > con1[0] && rand < con1[1]) || (rand > con2[0] && rand < con2[1])) {
    return rand;
  }

  return getNum(con1, con2);
}


var agent = navigator.userAgent.toLowerCase(); //检测是否是ios
var iLastTouch = null; //缓存上一次tap的时间
if (agent.indexOf('iphone') >= 0 || agent.indexOf('ipad') >= 0) {
  document.body.addEventListener('touchend', function (event) {
    var iNow = new Date().getTime();
    iLastTouch = iLastTouch || iNow + 1 /** 第一次时将iLastTouch设为当前时间+1 */ ;
    var delta = iNow - iLastTouch;
    if (delta < 500 && delta > 0) {
      event.preventDefault();
      return false;
    }
    iLastTouch = iNow;
  }, false);
}



// module.exports = verifyStatus;
export default verifyStatus;

window.removeStop = function (obj) {
  var e = arguments.length;
  if (e > 1) {
    console.log(arguments);
    for (var i = 0; i < e; i++) {
      // console.log(arguments[i]);
      if (arguments[i] != null) {
        console.log(arguments[i])
        createjs.Tween.removeTweens(arguments[i]);
        arguments[i].parent.removeChild(arguments[i]);
      }
    }
  }
}


window.addShape = (shapeName, x, y, w, h, alh, type, container_) => {
  window[shapeName] = new createjs.Shape();
  if (type == "circle") {
    window[shapeName].graphics.beginFill("#000").drawCircle(x, y, w);
  } else {
    window[shapeName].graphics.beginFill("#000").drawRect(x, y, w, h);
  }
  window[shapeName].alpha = alh;
  person.addChild(window[shapeName]);
  if (container_) {
    container_.addChild(window[shapeName]);
  }

}




// 位图加载完(base64不需要加载)初始化为全局对象
window.addBitmap = (img_name, img_, x_, y_, addArr) => {
  wb[img_name] = new createjs.Bitmap(img_);
  wb[img_name].name = null;
  if (typeof x_ != "undefined" && typeof y_ != "undefined") {
    wb[img_name].x = x_;
    wb[img_name].y = y_;
  }
  //  reg_set(wb[img_name], 0.5, 0.5);
  return wb[img_name];
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
    window.document.on('keydown', function (event) {
      var keyNum = event.which; //获取键值
      switch (keyNum) { //判断按键
        case 37:
          _this.transLeft();
          break; //左
        case 38:
          _this.transDown();
          break; //上
        case 39:
          _this.transRight();
          break; //右
        case 40:
          _this.transUp();
          break; //下
        case 100:
          _this.transSmall();
          break; //小键盘4
        case 102:
          _this.transBig();
          break; //小键盘6
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
        (transObjox - transObj.o.getBounds().width / (1 / (transObj.o.regX / transObj.o.getBounds().width))).toFixed(1) +
        "," + (transObjoy - transObj.o.getBounds().height / (1 / (transObj.o.regY / transObj.o.getBounds().height))).toFixed(1), "xx:" + transObjox, ",yy:" + transObjoy, "scale" + transObj.o.scaleX
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
        (transObjox - transObj.o.getBounds().width / (1 / (transObj.o.regX / transObj.o.getBounds().width))).toFixed(1) +
        "," + (transObjoy - transObj.o.getBounds().height / (1 / (transObj.o.regY / transObj.o.getBounds().height))).toFixed(1), "xx:" + transObjox, ",yy:" + transObjoy, "scale" + transObj.o.scaleX
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






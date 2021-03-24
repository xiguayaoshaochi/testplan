<template>
  <div id='facebookBG'>
    <img src="../images/facebook_bg.png" id="bgimg" />
    <div class="video">
      <video-player
        class="video-player vjs-custom-skin"
        ref="videoPlayer"
        name="videoPlayer"
        id="video"
        :playsinline="true"
        :options="playerOptions"
        @ready = "playerReadied"
        src='https://7465-test-1gotf68l43775c18-1303960370.tcb.qcloud.la/video/1616393844990EverMerge11.mp4?sign=d22e2a65984ee87e8288bdad31fd7ad7&t=1616405103'
      >
      </video-player>
    </div>
    <sidebarVideo @changeUpload="changeUpload"></sidebarVideo>
  </div>
</template>
<script>
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
import sidebarVideo from './sidebarVideo.vue'
export default {
  name: "showVideo",
  components: {
    videoPlayer,
    sidebarVideo
  },
  data() {
    return {
      playTime:'',
      current:'',
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: true, // 是否视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", // 类型
            src: "https://7465-test-1gotf68l43775c18-1303960370.tcb.qcloud.la/video/1616393844990EverMerge11.mp4?sign=d22e2a65984ee87e8288bdad31fd7ad7&t=1616405103" // url地址
          }
        ],
        poster: "", // 封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
            timeDivider: true, // 当前时间和持续时间的分隔符
            durationDisplay: true, // 显示持续时间
            remainingTimeDisplay: false, // 是否显示剩余时间功能
            fullscreenToggle: true // 是否显示全屏按钮
        },
      },
    }
  },
  created() {
    
  },
  mounted() {

  },
  methods: {
    changeUpload(e){
      var src = e;
      console.log(e)
      // this.$refs.videoPlayer.player.src(src);
      // this.$refs.videoPlayer.player.play();
       // 设置视频的src
      this.$refs.videoPlayer.$el.setAttribute("src", src);
      this.$refs.videoPlayer.player.load();
      this.$refs.videoPlayer.player.play();
    },
    //将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数。。
    playerReadied(player) {
      
        // console.log('example player 1 readied', player);
        player.currentTime(this.current)
    }
        
  },
}
</script>
<style lang="scss">
  #facebookBG{
    // background: url(../images/facebook_bg.png) center top no-repeat;
    // background-size: 100%;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 60px;
    .video{
      width: 940px;
      height: 350px;
      left: 50%;
      top: 51px;
      position: absolute;
      transform: translateX(-50%);
    }
    .vjs_video_3-dimensions.vjs-fluid {
      padding-top: 316px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      overflow: hidden;
    }
    #bgimg{
      position: absolute;
      z-index: 0;
    }
  }
  .vjs-custom-skin > .video-js .vjs-big-play-button {
    background-color: rgba(0,0,0,0.45);
    font-size: 3.0em;
    /* border-radius: 50%; */
    height: 1.5em !important;
    line-height:1.5em !important;
    margin-top: -1em !important;
  }
  /*这里用了第三方vue-video-player插件，但这个插件有bug，设置globalSetting:{controls:true}隐藏进度条不生效，故可设置插件样式进行隐藏vjs-progress-contro*/
  .vjs-progress-control {
      /* visibility:hidden;        */
  }
  
</style>
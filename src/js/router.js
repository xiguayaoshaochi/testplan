import Vue from "vue"
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import login from '../js/login.vue'
import register from '../js/register.vue'
import upload from '../js/upload.vue'
import uploadVideo from '../js/uploadVideo.vue'
import facebookIndex from '../js/facebookIndex.vue'
import index from '../js/index.vue'
import show from '../js/show.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    { path: '/register', component: register },
    {
      path: '/show',
      component: show
    }, {
      path: '/upload',
      component: upload
    }, {
      path: '/index',
      component: index
    }, {
      path: '/uploadVideo',
      component: uploadVideo
    }, {
      path: '/facebookIndex',
      component: facebookIndex
    }
  ]
})

export default router
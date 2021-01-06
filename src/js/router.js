import Vue from "vue"
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import login from '../js/login.vue'
import register from '../js/register.vue'
import index from '../js/index.vue'

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    { path: '/register', component: register },
    {
      path: '/index',
      component: index
    }
  ]
})

export default router
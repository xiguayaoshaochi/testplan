import Vue from "vue"
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import login from '../js/login.vue'
import register from '../js/register.vue'

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    { path: '/register', component: register }
  ]
})

export default router
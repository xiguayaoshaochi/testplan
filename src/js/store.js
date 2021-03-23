import Vue from "vue"
import Vuex from 'vuex'
Vue.use(Vuex);


export default new Vuex.Store({
  state:{
    loginState:0
  },
  getters:{
    getState(state) {
      return state.loginState
    }
  },
  mutations: { // 增加nutations属性
    setloginState(state, payload) { // state是必须默认参数
      state.loginState = payload.state;
    }
  },
  actions: { // 增加actions属性
    setNum(content, payload) { // 增加payload参数
        return new Promise(resolve => {
          setTimeout(() => {
            content.commit('setNumberIsWhat', {
              number: payload.number
            });
            resolve();
          }, 1000);
        });
      },
  }
})
  
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let search_param;
export default new Vuex.Store({
  state: {
    search_param,
  },
  getters: {
    get_search_param(state){
      return state.search_param
    }
  },
  mutations: {
    mod_search_param(state,param){
      state.search_param=param
    }
  },
  actions: {
  },
  modules: {
  }
})

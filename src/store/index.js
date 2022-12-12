import Vue from 'vue'
import Vuex from 'vuex'
import {NormalizeSearchParam} from "@/views/SearchResult/SearchDataType";

Vue.use(Vuex)

let search_param;
let page_info={
  org:[],
  sub:[],
  thm:[],
  src:[],
  papers:[],
  n_page:0
};
export default new Vuex.Store({
  state: {
    search_param,
    page_info,
  },
  getters: {
    get_search_param(state){
      return state.search_param
    },
    get_page_info(state){
      return state.page_info
    }
  },
  mutations: {
    mod_search_param(state,param){
      state.search_param=NormalizeSearchParam(param)
    },
    mod_page_info(state,info){
      state.page_info=info
    }
  },
  actions: {
  },
  modules: {
  }
})

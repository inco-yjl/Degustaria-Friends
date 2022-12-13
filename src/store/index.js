import Vue from 'vue'
import Vuex from 'vuex'
import {NormalizeSearchParam, PAGE_SIZE} from "@/views/SearchResult/SearchDataType";

Vue.use(Vuex)

let search_param={
  size:PAGE_SIZE
};
let page_info={
  org:[],
  field:[],
  source:[],
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
      return JSON.parse(JSON.stringify(state.search_param))
    },
    get_page_info(state){
      return JSON.parse(JSON.stringify(state.page_info))
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

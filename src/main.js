import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '../node_modules/echarts-map/js/world.js' 
import './styles/font.less'
import axios from '@/plugins/axios/axios.js'
import qs from 'qs';
import * as echarts from 'echarts';
import VueParticles from 'vue-particles'

Vue.use(VueParticles)
Vue.config.productionTip = false;
Vue.prototype.$qs=qs;
Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

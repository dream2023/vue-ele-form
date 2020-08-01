import Vue from 'vue'
import App from './App.vue'
import EleForm from '../lib/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'

axios.interceptors.response.use(response => {
  // 将响应结果返回
  return response.data
})
Vue.prototype.$axios = axios
Vue.use(ElementUI)
Vue.use(EleForm)

new Vue({
  render: h => h(App)
}).$mount('#app')

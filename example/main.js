import Vue from 'vue'
import App from './App.vue'
import EleForm from '../lib/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(EleForm)

new Vue({
  render: h => h(App)
}).$mount('#app')

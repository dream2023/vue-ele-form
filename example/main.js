import Vue from 'vue'
import App from './App.vue'
import EleForm from '../src/index'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(EleForm)

new Vue({
  render: h => h(App)
}).$mount('#app')

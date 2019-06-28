import Vue from 'vue'
import App from './App.vue'
import EleForm from '../lib/index'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import CustomUrl from './CustomUrl'
Vue.component(CustomUrl.name, CustomUrl)

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(EleForm)

new Vue({
  render: h => h(App)
}).$mount('#app')

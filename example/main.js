import Vue from 'vue'
import App from './App.vue'
import VueRunSfc from 'vue-run-sfc'
import { Link } from 'element-ui'

Vue.use(Link)
Vue.use(VueRunSfc, {
  jsLabs: [
    'https://unpkg.com/element-ui@2.13.0/lib/index.js',
    'https://unpkg.com/vue-ele-form@0.8.1/dist/vue-ele-form.umd.min.js'
  ],
  cssLabs: ['https://unpkg.com/element-ui/lib/theme-chalk/index.css']
})

new Vue({
  render: h => h(App)
}).$mount('#app')

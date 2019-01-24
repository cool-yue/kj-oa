import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Login from './Login.vue'

Vue.config.productionTip = false;
let isLogin = true;

new Vue({
  render: h => isLogin?h(App):h(Login)
}).$mount('#app')

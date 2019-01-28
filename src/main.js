import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import { Message } from 'element-ui';
import Alert from './components/shared/Alert';

Vue.use(Message);
Vue.prototype.$message = Message;


Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  mounted() {
    console.log(this);
  }
}).$mount('#app')

import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import Login from './Login.vue'



Vue.config.productionTip = false;
Vue.prototype.$notify = function(type,message) {
    console.log(this.$root.$refs);
    this.$root.$refs.alert.show = true;
    setTimeout(()=>{
      this.$root.$refs.alert.show = false;
    },3000);
}

new Vue({
  render: h => h(App),
}).$mount('#app')

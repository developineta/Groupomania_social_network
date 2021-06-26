import Vue from 'vue';
import App from './App.vue';
import router from './router';
import SimpleVueValidation from 'simple-vue-validator';
import vuetify from './plugins/vuetify';
import store from '../store';

Vue.use(SimpleVueValidation);
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

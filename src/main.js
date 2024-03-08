import '@/assets/css/style.css';

import Vue from 'vue';
import App from './App.vue';

import Store from '@/store/index';
import router from './router/index';

Vue.config.productionTip = false;

// plugins
import validateForm from '@/plugins/validateForm';
import modal from '@/plugins/modal';

Vue.use(validateForm);
Vue.use(modal);

window.vue = new Vue({
  store: Store,
  router,
  render: h => h(App),
}).$mount('#app');



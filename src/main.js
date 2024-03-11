import '@/assets/css/style.css';

import Vue from 'vue';
import App from './App.vue';

import Store from '@/store/index';
import router from './router/index';

Vue.config.productionTip = false;

// plugins
import ValidateForm from '@/plugins/validateForm';
import Modal from '@/plugins/modal';
import DefinePaymentStatus from "@/plugins/definePaymentStatus";
import GetUserRole from "@/plugins/getUserRole";

Vue.use(ValidateForm);
Vue.use(Modal);
Vue.use(DefinePaymentStatus);
Vue.use(GetUserRole);

window.vue = new Vue({
  store: Store,
  router,
  render: h => h(App),
}).$mount('#app');



import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import axios from 'axios';
// import { Button, Row, Col } from "ant-design-vue";
import { Modal, Alert } from "ant-design-vue";

Vue.config.productionTip = false;
// Vue.component(Button.name, Button);
// Vue.component(Row.name, Row);
// Vue.component(Col.name, Col);
Vue.component(Modal.name, Modal);
Vue.component(Alert.name, Alert);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

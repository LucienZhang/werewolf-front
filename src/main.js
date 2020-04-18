import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import axios from 'axios';
// import { Button, Row, Col } from "ant-design-vue";

Vue.config.productionTip = false;
// Vue.component(Button.name, Button);
// Vue.component(Row.name, Row);
// Vue.component(Col.name, Col);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

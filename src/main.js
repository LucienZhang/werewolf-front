import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import axios from 'axios';
// import { Button, Row, Col } from "ant-design-vue";
import { Modal, FormModel, Input, Checkbox, Icon, message, Radio, Button } from "ant-design-vue";

Vue.config.productionTip = false;
// Vue.component(Button.name, Button);
// Vue.component(Row.name, Row);
// Vue.component(Col.name, Col);
Vue.use(Modal);
// Vue.use(Alert);
Vue.use(FormModel);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Icon);
Vue.use(Radio);
Vue.use(Button);

Vue.prototype.$message = message;


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import HighchartsVue from 'highcharts-vue'
import axios from 'axios';
import VueAxios from 'vue-axios'
import store from './components/store';
import router from './router';
Vue.use(require('vue-moment'))
import VueSession from 'vue-session'
Vue.use(VueSession)
Vue.use(VueAxios, axios);
Vue.config.productionTip = false,
Vue.use(HighchartsVue)
Vue.use(VueRouter);



new Vue({
  vuetify,
  store,
  router,
  
  render: h => h(App)
}).$mount('#app')

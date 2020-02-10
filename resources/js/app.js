import '@mdi/font/css/materialdesignicons.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import './bootstrap';
import axios from 'axios';

const opts = {
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
};

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

Vue.use(VueRouter);
Vue.use(Vuetify);

Vue.component('example-component', require('./components/ExampleComponent.vue').default);
Vue.component('login-auth', require('./pages/admin/auth/Login.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const router = new VueRouter(routes);

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // eslint-disable-next-line no-undef
    axios.get('/user')
      .then(() => {
        next();
      })
      .catch(error => {
        if (error.response.status === 401) {
          next({ path: '/login' });
        } else {
          next();
        }
      });
  } else {
    next();
  }
});

new Vue({
  el: '#app',
  router: router,
  vuetify: new Vuetify(opts)
});

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
require('@/style/styles.css')

Vue.config.productionTip = false

import NavBar from '/components/NavBar';
import Footer from '/components/Footer';

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App,
    NavBar,
    Footer
  },
  template: '<App/>',
  mode: 'history'
})

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Footer from './components/Footer.vue'
import NavBar from './components/NavBar.vue'
import router from './router'
require('@/style/styles.css')

Vue.component('Footer', Footer);
Vue.component('NavBar', NavBar);


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App,
    Footer,
    NavBar
  },
  template: '<App/>',
  mode: 'history'
})

<template>
  <div id="app">
    <NavBar />
    <router-view/>
    <Footer />
  </div>
</template>


<script>
import Vue from 'vue'
import NavBar from './components/NavBar';
import Footer from './components/Footer';
Vue.component('Footer', Footer);
Vue.component('NavBar', NavBar);

export default {
  name: 'App',
  components: {
    NavBar,
    Footer
  }
}
</script>

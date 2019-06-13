<template>
  <div id="app">
    <NavBar></NavBar>
    <router-view/>
    <Footer></Footer>
  </div>
</template>


<script>
import Footer from './components/Footer'
import NavBar from './components/NavBar'

export default {
  name: 'App',
  components: {
    Footer,
    NavBar
  }
}
</script>

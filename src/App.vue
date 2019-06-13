<template>
  <div id="app">
    <NavBar />
    <router-view/>
    <Footer />
  </div>
</template>


<script>

export default {
  name: 'App',
  components: {
    NavBar,
    Footer
  }
}
</script>

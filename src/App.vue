<template>
  <div id="app">
    <page-loader></page-loader>
    <router-view/>
  </div>
</template>

<script>
import PageLoader from '@/components/macro/PageLoader.vue'

export default {
  name: 'app',
  components: {
    PageLoader
  },
  mounted: function () {
    let app = this

    setTimeout(function () {
      app.$root.$emit('pageIsLoaded')
    }, 3500)
  }
}
</script>

<style lang="less">
html, body {
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: 'Lato', sans-serif;
}

@avar: blue;

#app {
  width: 100%;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>

<template>
  <div class="dashboard">
    
  </div>
</template>

<script>
export default {
  created: function() {
    let app = this;
    // Let's check if the user is really loged, if not, redirect to homepage.
    if(!app.$store.state.user.user) {
      app.$router.push({ path: '/' })
    }
  } 
}
</script>

<style lang="less">

</style>

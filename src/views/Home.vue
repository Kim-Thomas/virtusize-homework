<template>
  <div class="home">

    <HomepageSidebar />
    <FeaturesSlider />

  </div>
</template>

<script>
import HomepageSidebar from '@/components/macro/HomepageSidebar.vue'
import FeaturesSlider from '@/components/macro/FeaturesSlider.vue'

export default {
  name: 'home',
  components: {
    HomepageSidebar,
    FeaturesSlider
  },
  created: function () {
    let app = this

    // If there is a session, automatically log-in the user.
    if (sessionStorage.getItem('session_user') && JSON.parse(sessionStorage.getItem('session_user'))) {
      this.$store.dispatch('updateUser', JSON.parse(sessionStorage.getItem('session_user')))
        .then(function (result) {
          app.$router.push({ path: 'dashboard' })
        }, function (err) {
          console.error(err)
        })
    }
  }
}
</script>

<style lang="less">
.home {
  width: 100%;
  height: 100%;
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 460px 1fr;
  grid-template-columns: 460px 1fr;
  background: #24C6DC;
  background: -webkit-linear-gradient(to top left, #514A9D, #24C6DC);
  background: linear-gradient(to top left, #514A9D, #24C6DC);

  @media screen and (max-width: 1024px) {
    -ms-grid-columns: 360px 1fr;
    grid-template-columns: 360px 1fr;
  }

  @media screen and (max-width: 760px) {
    -ms-grid-columns: 1fr;
    grid-template-columns: 1fr;

    .features-slider {
      display: none;
    }
  }
}
</style>

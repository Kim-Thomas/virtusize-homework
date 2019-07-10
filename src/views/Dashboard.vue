<template>
  <div class="dashboard">

    <DashboardSidebar />
    <div class="dashboard-content">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import DashboardSidebar from '@/components/macro/DashboardSidebar.vue'

export default {
  components: {
    DashboardSidebar
  },
  created: function () {
    let app = this
    // Let's check if the user is really loged, if not, redirect to homepage.
    if (!app.$store.state.user.user._id) {
      app.$router.push({ path: '/' })
    }
  }
}
</script>

<style lang="less">
.dashboard {
  width: 100%;
  height: 100%;
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: 320px 1fr;
  grid-template-columns: 320px 1fr;

  @media screen and (max-width: 770px) {
    -ms-grid-columns: 260px 1fr;
    grid-template-columns: 260px 1fr;
  }

  @media screen and (max-width: 660px) {
    -ms-grid-columns: 50px 1fr;
    grid-template-columns: 50px 1fr;
  }

  .dashboard-content {
    -ms-grid-column: 2;
  }
}
</style>

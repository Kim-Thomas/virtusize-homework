<template>
  <div class="dashboard">
    <div class="sidebar">
      <div class="site-branding">
        <img class="site-branding__logo" alt="Virtusize Logo" :src="LogoWithText">
      </div>
      <div class="content">
        <h3 class="sidebar-title">My Dashboard</h3>
        <ul>
          <li>
            <router-link to="/dashboard/account-details">Account Details</router-link>
          </li>
          <li>
            <router-link to="/dashboard/my-wardrobe">My Wardrobe</router-link>
          </li>
          <li>
            <router-link to="/dashboard/about">About</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="dashboard-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LogoWithText from '@/assets/brand/logo-w-text.svg';

export default {
  computed: {
    LogoWithText() { return LogoWithText }
  },
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
.dashboard {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 360px 1fr;

  .sidebar {
    border-right: .5px solid rgba(0,0,0,.2);
    position: relative;
    background: white;
    display: flex;
    align-items: center;
    z-index: 9;

    .site-branding {
      position: absolute;
      top: 30px;
      left: 30px;

      &__logo {
        height: 25px;
      }
    }

    .content {
      padding: 0 30px;
      box-sizing: border-box;

      .sidebar-title {
        margin-top: 0;
        font-size: 1.5em;
      }

      ul {
        padding: 0;
        margin: 0;

        li {
          list-style: none;
          margin: 15px 0;

          a {
            text-decoration: none;
            color: inherit;
          }
        }
      }
    }
  }
}
</style>

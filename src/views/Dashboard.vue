<template>
  <div class="dashboard">
    <div class="sidebar">
      <div class="site-branding">
        <img class="site-branding__logo" alt="Virtusize Logo" :src="LogoWithText">
      </div>
      <div class="content">
        <h3 class="sidebar-title">Dashboard</h3>
        <ul>
          <li>
            <router-link to="/dashboard/account-details">
              <font-awesome-icon icon="user-secret" /> Account Details
            </router-link>
          </li>
          <li>
            <router-link to="/dashboard/my-wardrobe">
              <font-awesome-icon icon="socks" /> My Wardrobe
            </router-link>
          </li>
        </ul>
        <h3 class="sidebar-title">Others</h3>
        <ul>
          <li>
            <router-link to="/dashboard/about">
              <font-awesome-icon icon="question-circle" /> About
            </router-link>
          </li>
          <li>
            <a href="" class='log-out-link'>
              <font-awesome-icon icon="sign-out-alt" /> log Out
            </a>
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
    if(!app.$store.state.user.user._id) {
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
  grid-template-columns: 320px 1fr;

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
      width: 100%;
      padding: 0 30px;
      box-sizing: border-box;

      .sidebar-title {
        color: rgb(18, 100, 95);
        font-weight: 900;
        font-size: .8em;
        margin-top: 20px;
        margin-bottom: 20px;
        text-transform: uppercase;
        opacity: .4;
      }

      ul {
        padding: 0;
        margin: 0;

        li {          
          position: relative;
          list-style: none;

          a {
            display: block;
            text-decoration: none;
            color: inherit;
            font-size: 1em;
            font-weight: 600;
            padding: 15px 0;
            opacity: .6;

            &.log-out-link {
              color: #e74c3c;
            }

            &:hover {
              &::after {
                content: "";
                position: absolute;
                top: 0;
                left: calc(~'320px - 30px - 4px');
                height: 100%;
                width: 4px;
                background: rgba(22, 198, 186, 0.3);
              }   
            }

            &.router-link-active {
              opacity: .8;

              &::after {
                content: "";
                position: absolute;
                top: 0;
                left: calc(~'320px - 30px - 4px');
                height: 100%;
                width: 4px;
                background: #16C6B9;
              }
            }

            svg {
              width: 20px;
              margin-right: 10px;
            }
          }
        }
      }
    }
  }
}
</style>

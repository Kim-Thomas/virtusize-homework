<template>
  <div class="sidebar">
    <div class="site-branding">
      <img class="site-branding__logo" alt="Virtusize Logo" :src="LogoWithText">
    </div>
    <div class="sidebar-content">

      <!-- Sign In Panel -->
      <div class="panel" :class="current_panel == 'signin' ? 'visible' : ''">
        <h2 class="tagline">Online Clothes Shopping Made Easy</h2>
        <div class="form-label">Welcome back, please log-in to continue.</div>
        <div class="error-badge" v-if="signing_error">
          {{signing_error}}
        </div>
        <form class="signin-form" v-on:keyup.enter="tryLogIn()">
          <div class="processing-form-overlay" v-if="processing_signin">
            <div class="lds-dual-ring"></div>
          </div>
          <VirtusizeInput label="Email Address" v-model="signin.email"/>
          <VirtusizeInput label="Password" type="password" v-model="signin.password"/>
        </form>
        <input type="checkbox" name="remember-me" id="remember-me" v-model="signin.remember"> 
        <label for="remember-me" class="checkbox-label">Remember Me</label>
        <div class="actions">
          <VirtusizeBtn btn-class="btn btn--big" label="Log in" v-on:click.native="tryLogIn()"/>
          <VirtusizeBtn btn-class="btn btn--big btn--ghost" label="Sign up" v-on:click.native="changePanel('signup')"/>
        </div>
      </div>
      <!-- !Sign In Panel -->

      <!-- Sign Up Panel -->
      <div class="panel" :class="current_panel == 'signup' ? 'visible' : ''">
        <h2 class="tagline">Online Clothes Shopping Made Easy</h2>
        <div class="form-label">Thank you for your interest in Virtusize, please create an account to continue.</div>
        <form class="signup-form">
          <VirtusizeInput label="Email Address" v-model="signup.email"/>
          <VirtusizeInput label="Password" type="password" v-model="signup.password"/>
          <VirtusizeInput label="Password" type="password" v-model="signup.password_b"/>
        </form>
        <div class="actions">
          <VirtusizeBtn btn-class="btn btn--big" label="Sign up"/>
          <VirtusizeBtn btn-class="btn btn--big btn--ghost" label="Log in" v-on:click.native="changePanel('signin')"/>
        </div>
      </div>
      <!-- !Sign Up Panel -->
    </div>
    <div class="site-copyright">
      {{signin.remember}}
      Just a homework by Thomas Kim for Virtusize.
    </div>
  </div>
</template>

<script>
import VirtusizeInput from '@/components/micro/VirtusizeInput.vue';
import VirtusizeBtn from '@/components/micro/VirtusizeButton.vue';

import LogoWithText from '@/assets/brand/logo-w-text.svg';
import { setTimeout } from 'timers';

export default {
  components: {
    VirtusizeInput,
    VirtusizeBtn
  },
  data: function() {
    return {
      current_panel: 'signin',
      processing_signin: false,
      signing_error: false,
      signin: {
        email: '',
        password: '',
        remember: false
      },
      signup: {
        email: '',
        password: '',
        password_b: ''
      }
    }
  },
  computed: {
    LogoWithText() { return LogoWithText }
  },
  methods: {
    /**
     * Switch between Sign Up and Sign In panels.
     * new_panel [String]
     */
    changePanel(new_panel) {
      this.current_panel = new_panel;
    },
    /**
     * Dispatch a store action to try to login, if successful, redirects to the dashboard. If not, displays an error.
     */
    tryLogIn() {
      let app = this;
      app.processing_signin = true;
      app.$store.dispatch("tryLogin", {
          email: app.signin.email, 
          password: app.signin.password,
          remember: app.signin.remember
        })
        .then(function(result) {
          app.processing_signin = false;
          app.$router.push({ path: 'dashboard' })
        }, function(err) {
          app.processing_signin = false;
          app.signing_error = err;
          setTimeout(function() {
            app.signing_error = false;
          }, 5000)
        });
    }
  }
}
</script>

<style lang="less" scoped>
.sidebar {
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
      height: 30px;
    }
  }

  .sidebar-content {
    padding: 0 30px;
    box-sizing: border-box;
    color: #1d264e;

    .panel {
      //display: none;
      height: 0;
      visibility: hidden;
      overflow-y: hidden;
      opacity: 0;

      &.visible {
        //display: block;
        height: auto;
        visibility: visible;
        overflow-y: visible;
        opacity: 1;
        transition: opacity .3s;
      }

      .tagline {
        font-size: 2em;
        font-weight: 600;
        margin: 0;
        margin-bottom: .8em;
      }

      .form-label {
        font-size: 1em;
        opacity: .4;
        //font-weight: 600;
        margin-bottom: 3em;
      }

      .error-badge {
        margin-bottom: 10px;
        padding: 20px;
        box-sizing: border-box;
        background: #e74c3c;
        border-radius: 3px;
        color: white;
      }

      form {
        position: relative;

        .processing-form-overlay {
          position: absolute;
          z-index: 9;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255,255,255,.9);
          display: flex;
          align-items: center;
          justify-content: center;

          .lds-dual-ring {
            display: inline-block;
            width: 64px;
            height: 64px;
          }

          .lds-dual-ring:after {
            content: " ";
            display: block;
            width: 46px;
            height: 46px;
            margin: 1px;
            border-radius: 50%;
            border: 5px solid #16C6B9;
            border-color: #16C6B9 transparent #16C6B9 transparent;
            animation: lds-dual-ring 1.2s linear infinite;
          }
          
          @keyframes lds-dual-ring {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }

        }
      }

      input[type="checkbox"] {
        margin-top: 30px;
      }

      .checkbox-label {
        opacity: .6;
        font-size: 14px;
        margin-left: 5px;
      }

      .actions {
        margin-top: 50px;
      }
    }
  }

  .site-copyright {
    position: absolute;
    bottom: 30px;
    width: 100%;
    text-align: center;
    font-size: 12px;
    opacity: .6;
  }
}
</style>


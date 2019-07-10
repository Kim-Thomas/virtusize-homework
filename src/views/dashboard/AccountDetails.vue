<template>
  <div class="account-details">

    <!-- Account Hero -->
    <header class="account-hero">
      <div class="save-user-btn-container" v-if="saveable">
        <VirtusizeBtn btn-class="btn btn--big"
          label="Save Modifications"
          v-on:click.native="saveUser()"/>
      </div>
      <UserPortrait :email="user.email"/>
    </header>
    <!-- !Account Hero -->

    <!-- Main Container -->
    <section class="container">

      <!-- User Fullname Section -->
      <section class="user-fullname">

        <div class="editable-data">
          <div class="data">
            <span v-if="userFullname.length === 1">Undefined</span>
            {{userFullname}}
          </div>
          <font-awesome-icon icon="pen" v-on:click="toggleEditingMode('editing_fullname')"/>
        </div>

        <form class="edition-area" v-if="editing_fullname">
          <VirtusizeInput label="First Name"
            size="medium" v-model="user.first_name"
            :inline="true"
            :focused="true"
            :validity="firstNameIsValid"/>
          <VirtusizeInput label="Last Name"
            size="medium"
            v-model="user.last_name"
            :inline="true"
            :focused="true"
            :validity="lastNameIsValid"/>
        </form>

      </section>
      <!-- !User Fullname Section -->

      <!-- User Email Section -->
      <section class="user-email">

        <div class="editable-data">
          <div class="data">
            <span v-if="user.email.length === 0">Undefined</span>
            {{user.email}}
          </div>
          <font-awesome-icon icon="pen" v-on:click="toggleEditingMode('editing_email')"/>
        </div>

        <form class="edition-area" v-if="editing_email">
          <VirtusizeInput label="Email Address"
            size="medium"
            v-model="user.email"
            :focused="true"
            :validity="emailIsValid"/>
        </form>

      </section>
      <!-- !User Email Section -->

      <!-- Section Title -->
      <div class="section-title">
        Change Password
      </div>
      <div class="section-subtitle">
        Please write any password in the current password field.
      </div>
      <!-- !Section Title -->

      <!-- Change Password Section -->
      <section class="change-password-container">

        <form class="edition-area">
          <VirtusizeInput label="Current Password"
            type="password"
            size="medium"
            v-model="current_password"
            :inline="true"
            :password-visibility="true"
            :validity="currentPasswordIsValid"/>
          <VirtusizeInput label="New Password"
            type="password"
            size="medium"
            v-model="new_password"
            :inline="true"
            :password-strength="true"
            :strength="newPasswordStrength"
            :password-visibility="true"/>
        </form>

        <VirtusizeBtn btn-class="btn btn--big"
          label="Change Password"
          v-on:click.native="changePassword()"
          v-if="passwordIsChangeable"/>

      </section>
      <!-- !Change Password Section -->

    </section>
    <!-- !Main Container -->

  </div>
</template>

<script>
import VirtusizeInput from '@/components/micro/VirtusizeInput.vue'
import VirtusizeBtn from '@/components/micro/VirtusizeButton.vue'
import UserPortrait from '@/components/micro/UserPortrait.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { setTimeout } from 'timers'

let zxcvbn = require('zxcvbn')

export default {
  components: {
    VirtusizeInput,
    VirtusizeBtn,
    UserPortrait,
    FontAwesomeIcon
  },
  data: function () {
    return {
      edited: false,
      user: JSON.parse(JSON.stringify(this.$store.state.user.user)),
      editing_fullname: false,
      editing_email: false,
      current_password: '',
      new_password: ''
    }
  },
  computed: {
    /**
     * Returns the User fullname.
     */
    userFullname: function () {
      return this.user.first_name + ' ' + this.user.last_name
    },
    /**
     * Checks the validity of user's email.
     */
    emailIsValid: function () {
      let email = this.user.email
      let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (regex.test(String(email).toLowerCase())) {
        return 'valid'
      } else {
        return 'invalid'
      }
    },
    /**
     * Checks the validity of user's first name.
     */
    firstNameIsValid: function () {
      let first_name = this.user.first_name
      if (first_name.length > 1 && first_name.length < 20) {
        return 'valid'
      } else {
        return 'invalid'
      }
    },
    /**
     * Checks the validity of user's last name.
     */
    lastNameIsValid: function () {
      let last_name = this.user.last_name
      if (last_name.length > 1 && last_name.length < 20) {
        return 'valid'
      } else {
        return 'invalid'
      }
    },
    /**
     * Checks the validity of user's current password.
     */
    currentPasswordIsValid: function () {
      let current_password = this.current_password
      if (current_password.length >= 1) {
        return 'valid'
      } else {
        return 'invalid'
      }
    },
    /**
     * Checks if user is saveable:
     * - Checks that there has been changes made.
     * - Checks that data is valid.
     */
    saveable: function () {
      if (this.edited && this.emailIsValid === 'valid' && this.firstNameIsValid === 'valid' && this.lastNameIsValid === 'valid') {
        return true
      }
      return false
    },
    /**
     * Returns ZXCBN score for user's new password.
     */
    newPasswordStrength: function () {
      let val = this.new_password
      let result = zxcvbn(val)
      return result.score
    },
    /**
     * Checks if user's new password is changeable:
     * - Checks that there is a current password filled.
     * - Checks that the new password has a ZXCVBN score over 3
     */
    passwordIsChangeable: function () {
      if (this.current_password.length > 0 && this.newPasswordStrength >= 3) {
        return true
      }
      return false
    }
  },
  watch: {
    /**
     * Sets the edited variable to true when User changes.
     */
    user: {
      handler: function (new_user) {
        this.edited = true
      },
      deep: true
    }
  },
  methods: {
    /**
     * Toggles the edition area for a user attribute.
     * Parameters:
     * - (String) editing_data : editing_fullname || editing_email
     */
    toggleEditingMode: function (editing_data) {
      this[editing_data] = !this[editing_data]
    },
    /**
     * Saves the User
     * - Dispatch a store action to save the user.
     * - Close all edition areas.
     * - Trigger a toast notification.
     */
    saveUser: function () {
      let app = this
      app.$store.dispatch('updateUser', app.user)
        .then(function (result) {
          app.edited = false
          app.editing_fullname = false
          app.editing_email = false
          app.$toasted.success('User Saved')
        }, function (err) {
          console.error(err)
        })
    },
    /**
     * Updates User Password
     * - Dispatch a store action to update the password.
     * - Reinitialize inputs.
     * - Trigger a toast notification.
     */
    changePassword: function () {
      let app = this
      app.$store.dispatch('updateUserPassword', app.user, app.new_password)
        .then(function (result) {
          app.current_password = ''
          app.new_password = ''
          setTimeout(function () {
            $('input').focusout()
          })
          app.$toasted.success('Password Updated')
        }, function (err) {
          console.error(err)
        })
    }
  }
}
</script>

<style lang="less">
@portrait_size: 150px;
@portrait_size_mini: 90px;

.account-details {
  width: 100%;
  height: 100%;

  .account-hero {
    position: relative;
    width: 100%;
    height: 300px;
    background: #24C6DC;
    background: -webkit-linear-gradient(to top left, #514A9D, #24C6DC);
    background: linear-gradient(to top left, #514A9D, #24C6DC);

    @media screen and (max-width: 660px) {
      height: 150px;
    }

    .save-user-btn-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255,255,255,.8);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .user-portrait {
      position: absolute;
      width: @portrait_size;
      height: @portrait_size;
      border-radius: 50%;
      background: #222;
      bottom: -@portrait_size/2;
      left: 50%;
      margin-left: calc(-@portrait_size/2 - 4px);
      border: 4px solid white;
      background-size: cover;
      background-position: center;

      @media screen and (max-width: 660px) {
        width: @portrait_size_mini;
        height: @portrait_size_mini;
        bottom: -@portrait_size_mini/2;
        margin-left: calc(-@portrait_size_mini/2 - 4px);
      }
    }
  }

  .container {
    width: 95%;
    max-width: 560px;
    margin: auto;

    .editable-data {
      position: relative;
      display: inline-block;

      svg {
        position: absolute;
        transform: scale(.7);
        top: 0;
        right: -40px;
        color: @virtusize_blue;
        cursor: pointer;

        &:hover {
          transform: scale(.7) rotate(-20deg);
        }
      }
    }

    .user-fullname {
      text-align: center;
      margin: auto;
      margin-top: calc(@portrait_size/2 + 30px);
      font-size: 1.4em;
      font-weight: 600;

      @media screen and (max-width: 660px) {
        margin-top: calc(@portrait_size_mini/2 + 30px);
      }

      .edition-area {
        margin-top: 20px;
        display: flex;
      }
    }

    .user-email {
      text-align: center;
      margin-top: 10px;

      .editable-data {
        .data {
          opacity: .6;
        }
      }

      .edition-area {
        margin-top: 20px;
      }
    }

    .section-title {
      font-size: 1em;
      font-weight: 900;
      opacity: .8;
      margin-top: 60px;
      margin-bottom: 10px;
      text-transform: uppercase;
      color: @virtusize_blue;
    }

    .section-subtitle {
      font-size: .7em;
      font-weight: 600;
      text-transform: uppercase;
      opacity: .6;
      margin-bottom: 40px;
    }

    .change-password-container {

      .edition-area {
        display: flex;
        margin-bottom: 40px;
      }
    }
  }
}
</style>

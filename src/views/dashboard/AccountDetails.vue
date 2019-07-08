<template>
  <div class="account-details">
    <div class="account-hero">
      <div class="save-user-btn-container" v-if="saveable">
        <VirtusizeBtn btn-class="btn btn--big" label="Save Modifications" v-on:click.native="saveUser()"/>
      </div>
      <UserPortrait :email="user.email"/>
    </div>
    <div class="container">
      <div class="user-fullname">
        <div class="editable-data">
          <div class="data">
            {{userFullname}}
          </div>
          <font-awesome-icon icon="pen" v-on:click="toggleEditingMode('editing_fullname')"/>
        </div>
        <div class="edition-area" v-if="editing_fullname">
          <VirtusizeInput label="First Name" size="medium" v-model="user.first_name" :inline="true" :focused="true" :validity="firstNameIsValid"/>
          &nbsp;
          <VirtusizeInput label="Last Name" size="medium" v-model="user.last_name" :inline="true" :focused="true" :validity="lastNameIsValid"/>
        </div>
      </div>
      <div class="user-email">
        <div class="editable-data">
          <div class="data">
            {{user.email}}
          </div>
          <font-awesome-icon icon="pen" v-on:click="toggleEditingMode('editing_email')"/>
        </div>
        <div class="edition-area" v-if="editing_email">
          <VirtusizeInput label="Email Address" size="medium" v-model="user.email" :focused="true" :validity="emailIsValid"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VirtusizeInput from '@/components/micro/VirtusizeInput.vue';
import VirtusizeBtn from '@/components/micro/VirtusizeButton.vue';
import UserPortrait from '@/components/micro/UserPortrait.vue';

export default {
  components: {
    VirtusizeInput,
    VirtusizeBtn,
    UserPortrait
  },
  data: function() {
    return {
      edited: false,
      user: JSON.parse(JSON.stringify(this.$store.state.user.user)),
      editing_fullname: false,
      editing_email: false
    }
  },
  computed: {
    userFullname() {
      return this.user.first_name + ' ' + this.user.last_name;
    },
    emailIsValid() {
      let email = this.user.email;
      let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(regex.test(String(email).toLowerCase())) {
        return 'valid';
      } else {
        return 'invalid';
      }
    },
    firstNameIsValid() {
      let first_name = this.user.first_name;
      if(first_name.length > 1 && first_name.length < 20) {
        return 'valid';
      } else {
        return 'invalid';
      }
    },
    lastNameIsValid() {
      let last_name = this.user.last_name;
      if(last_name.length > 1 && last_name.length < 20) {
        return 'valid';
      } else {
        return 'invalid';
      }
    },
    saveable() {
      if(this.edited && this.emailIsValid == 'valid' && this.firstNameIsValid == 'valid' && this.lastNameIsValid == 'valid') {
        return true;
      }
      return false;
    }
  },
  watch: {
    user: {
      handler(new_user){
        this.edited = true;
        this.$store.commit('updateUser', new_user);
      },
      deep: true
    }
  },
  methods: {
    toggleEditingMode(editing_data) {
      this[editing_data] = !this[editing_data];
    },
    saveUser() {
      // Here we should save the User, but as this is just the demo, I'll simply set edited to false.
      this.edited = false;
    }
  }
}
</script>

<style lang="less">
@portrait_size: 150px;

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
    }
  }

  .container {
    width: 90%;
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
        color: #16C6B9;
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

      .edition-area {
        margin-top: 20px;
      }
    }

    .user-email {
      text-align: center;
      margin-top: 20px;
      
      .editable-data {
        .data {
          opacity: .6;
        }
      }

      .edition-area {
        margin-top: 20px;
      }
    }
  }
}
</style>


<template>
  <div class="account-details">
    <div class="account-hero">
      <div class="user-portrait"></div>
    </div>
    <div class="container">
      <div class="user-fullname">
        <div class="editable-data">
          <div class="data">
            {{userFullname}}
          </div>
          <font-awesome-icon icon="pen" />
        </div>
        <div class="edition-area">
          <BigInput label="First Name" v-model="user.first_name" :inline="true" :focused="true"/>
          &nbsp;
          <BigInput label="Last Name" v-model="user.last_name" :inline="true" :focused="true"/>
        </div>
      </div>
      <div class="user-email">
        <div class="editable-data">
          <div class="data">
            {{user.email}}
          </div>
          <font-awesome-icon icon="pen" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BigInput from '@/components/micro/BigInput.vue';

export default {
  components: {
    BigInput
  },
  data: function() {
    return {
      saveable: false,
      user: JSON.parse(JSON.stringify(this.$store.state.user.user))
    }
  },
  computed: {
    userFullname() {
      return this.user.first_name + ' ' + this.user.last_name;
    }
  },
  watch: {
    user: {
      handler(new_user){
        this.saveable = true;
        this.$store.commit('updateUser', new_user);
      },
      deep: true
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
    max-width: 660px;
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
      opacity: .6;
    }
  }
}
</style>


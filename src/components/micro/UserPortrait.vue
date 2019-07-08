<template>
  <div class="user-portrait" :style="'background-image: url('+ portrait +')'">
  </div>
</template>

<script>
import { setTimeout } from 'timers';

let md5 = require('md5');

export default {
  props: {
    email: {
      type: String,
      default: 'haruki@murakami.com'
    }
  },
  data: function() {
    return {
      isUsingDefault: false,
      portrait: encodeURI('https://res-2.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco/v1461215115/typtmcfflkmdi7v9kduo.png')
    }
  },
  computed: {
    sanitizedEmail() {
      let email = this.email;
      let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if(regex.test(String(email).toLowerCase())) {
        email = email.trim();
        email = email.toLowerCase();
        return email;
      }
      return false;
    },
    gravatarPortraitURL() {

    }
  },
  watch: {
    email: function(newVal, oldVal) {
      let app = this;
      let email = app.sanitizedEmail;
      if(email) {
        console.log('test')
        let md5_email = md5(email);
        let gravatar_base_url = "https://www.gravatar.com/avatar/"
        let size = "?s=200"
        let default_image = "&d=" + encodeURI('https://res-2.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco/v1461215115/typtmcfflkmdi7v9kduo.png')
        app.portrait = gravatar_base_url + md5_email + size + default_image;
        console.log(app.portrait);
        app.isUsingDefault = false;
      } else {
        if(!app.isUsingDefault) {
          app.portrait = encodeURI('https://res-2.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco/v1461215115/typtmcfflkmdi7v9kduo.png');
          app.isUsingDefault = true;
        }
      }
    }
  }
}
</script>

<style lang="less">

</style>

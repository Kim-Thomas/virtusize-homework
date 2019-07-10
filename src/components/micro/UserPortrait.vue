<template>
  <div class="user-portrait" :style="'background-image: url('+ portrait +')'">
  </div>
</template>

<script>
let md5 = require('md5')
let default_image_url = 'https://hitberry.com//uploads/2018/04/15/haruki-murakami-1523791076.jpg'

let debounce = require('lodash.debounce')

export default {
  props: {
    email: {
      type: String,
      default: 'haruki@murakami.com'
    }
  },
  data: function () {
    return {
      isUsingDefault: false,
      portrait: encodeURI(default_image_url)
    }
  },
  computed: {
    /**
     * Returns a sanitized email:
     * - matches the regex for an email
     * - trimmed
     * - lower-cased
     */
    sanitizedEmail: function () {
      let email = this.email
      let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (regex.test(String(email).toLowerCase())) {
        email = email.trim()
        email = email.toLowerCase()
        return email
      }
      return false
    }
  },
  watch: {
    /**
     * Everytime the email changes, if it's a valid email, checks gravatar for a portrait.
     * If not a valid email, keeps the default portrait.
     */
    email: debounce(function (newVal, oldVal) {
      let app = this
      let email = app.sanitizedEmail
      if (email) {
        let md5_email = md5(email)
        let gravatar_base_url = 'https://www.gravatar.com/avatar/'
        let size = '?s=200'
        let default_image = '&d=' + encodeURI(default_image_url)
        app.portrait = gravatar_base_url + md5_email + size + default_image
        app.isUsingDefault = false
      } else {
        if (!app.isUsingDefault) {
          app.portrait = encodeURI(default_image_url)
          app.isUsingDefault = true
        }
      }
    }, 500)
  },
  mounted: function () {
    let app = this

    /**
     * Initialize portrait, cf the watch email above.
     */
    let email = app.sanitizedEmail
    if (email) {
      let md5_email = md5(email)
      let gravatar_base_url = 'https://www.gravatar.com/avatar/'
      let size = '?s=200'
      let default_image = '&d=' + encodeURI(default_image_url)
      app.portrait = gravatar_base_url + md5_email + size + default_image
      app.isUsingDefault = false
    } else {
      if (!app.isUsingDefault) {
        app.portrait = encodeURI(default_image_url)
        app.isUsingDefault = true
      }
    }
  }
}
</script>

<style lang="less">

</style>

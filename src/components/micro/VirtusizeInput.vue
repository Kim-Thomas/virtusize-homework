<template>
  <div class="virtusize-input-group" :class="groupClasses">
    <label :for="uniqueId">{{label}}</label>
    <input :id="uniqueId" :type="type" :value="value" v-on:keyup="updateInputVal($event.target.value)">
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      default: 'Undefined Label'
    },
    size: {
      type: String,
      default: 'big'
    },
    inline: {
      type: Boolean,
      default: false,
    },
    focused: {
      type: Boolean,
      default: false
    },
    validity: {
      type: String,
      default: 'neither-valid-nor-invalid'
    }
  },
  data: function() {
    return {
      uniqueId: this.makeid(),
      input_val: ''
    }
  },
  computed: {
    groupClasses() {
      let app = this;
      let classes = '';
      if(app.focused) {
        classes += 'focused ';
      }
      if(app.inline) {
        classes += 'inline ';
      }
      if(app.size) {
        classes += app.size + ' ';
      }
      if(app.validity != 'neither-valid-nor-invalid') {
        classes += app.validity + ' ';
      }
      return classes;
    }
  },
  methods: {
    updateInputVal: function(value) {
      this.$emit('input', value);
    },
    /**
     * Generate a unique ID
     */
    makeid: function() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }
  },
  created: function() {

  },
  mounted: function() {
    let app = this;

    $('#'+app.uniqueId).on('focus', function() {
      $(this).parent('.virtusize-input-group').addClass('focused');
    });
    $('#'+app.uniqueId).on('focusout', function() {
      if($(this).val().length == 0) {
        $(this).parent('.virtusize-input-group').removeClass('focused');
      }
    });
  }
}
</script>

<style lang="less">
.virtusize-input-group {
  position: relative;
  box-shadow: 0 0 1px #16C6B9;
  border-left: 4px solid rgba(255, 255, 255, 1);

  &.inline {
    display: inline-block;
  }

  label {
    font-size: 16px;
    position: absolute;
    font-weight: 600;
    top: 26px;
    left: 15px;
    transition: .3s;
  }

  input{
    width: 100%;
    padding: 22px 15px;
    padding-top: 30px;
    box-sizing: border-box;
    font-family: 'Lato', sans-serif;
    font-size: 16px;
    font-weight: 600;
    //color: #24C6DC;
    border: none;
    outline: none;
  }

  &.medium {

    label {
      top: 20px;
    }

    input {
      padding: 10px 15px;
      padding-top: 30px;
    }
  }

  &.focused {
    border-left: 4px solid #16C6B9;
    transition: .3s;

    label {
      top: 10px;
      font-size: 12px;
      opacity: .6;
      transition: .3s;
    }
  }

  &.invalid {
    border-left: 4px solid #e74c3c;
  }
}
</style>

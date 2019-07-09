<!--
Component VirtusizeInput
==================================
Properties:
- (String) value: value of the input.
- (String) type: input's type.
- (String) label: input's label.
- (String) size: component's size : big (default) || medium
- (Boolean) inline: whether the input should be an inline element or not. false by default.
- (Boolean) focused: wheter the input should have the focused class by default or not. false by default.
- (String) validity: whether the input is valid or invalid.
- (Boolean) passwordStrength: whether to display a strength meter or not.
- (Number) strength: number representing a ZXCVBN score.
- (Boolean) passwordVisibility: whether allow password visibility toggling or not.
-->

<template>
  <div class="virtusize-input-group" :class="groupClasses">

    <label :for="uniqueId">{{label}}</label>

    <div class="toggle-password-visibility" 
      v-if="type == 'password' && passwordVisibility" 
      v-on:click="togglePasswordVisibility($event)">
      <font-awesome-icon icon="eye" class="show-password-icon"/>
      <font-awesome-icon icon="eye-slash" class="hide-password-icon" style="display: none"/>
      <span>Show</span>
    </div>

    <input :id="uniqueId" 
      :type="type" 
      :value="value" 
      v-on:keyup="updateInputVal($event.target.value)">

    <PasswordStrengthMeter v-if="passwordStrength" :strength="strength"/>

  </div>
</template>

<script>
import PasswordStrengthMeter from '@/components/micro/PasswordStrengthMeter.vue'

let zxcvbn = require('zxcvbn');

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
    },
    passwordStrength: {
      type: Boolean,
      default: false
    },
    strength: {
      type: Number,
      default: 0
    },
    passwordVisibility: {
      type: Boolean,
      default: false
    }
  },
  components: {
    PasswordStrengthMeter
  },
  data: function() {
    return {
      uniqueId: this.makeid(),
      input_val: ''
    }
  },
  computed: {
    /**
     * Returns a list of classes depending on the different properties passed.
     */
    groupClasses: function() {
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
    /**
     * Emit the input's value so that parent component can use v-model
     */
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
    },
    /**
     * Toggles between password visible mode and password invisible mode
     */
    togglePasswordVisibility: function(e) {
      let app = this;
      $('#'+app.uniqueId).focus();
      let current_type = $('#'+app.uniqueId).attr('type');
      if(current_type == 'password') {
        $('#'+app.uniqueId).attr('type', 'text');
        $('#'+app.uniqueId).parent('.virtusize-input-group').find('.show-password-icon').hide();
        $('#'+app.uniqueId).parent('.virtusize-input-group').find('.hide-password-icon').show();
        $('#'+app.uniqueId).parent('.virtusize-input-group').find('.toggle-password-visibility span').html('Hide');
      }
      if(current_type == 'text') {
        $('#'+app.uniqueId).attr('type', 'password');
        $('#'+app.uniqueId).parent('.virtusize-input-group').find('.show-password-icon').show();
        $('#'+app.uniqueId).parent('.virtusize-input-group').find('.hide-password-icon').hide();
        $('#'+app.uniqueId).parent('.virtusize-input-group').find('.toggle-password-visibility span').html('Show');
      }
    }
  },
  mounted: function() {
    let app = this;

    /**
     * Handles the focused state, input is focused if:
     * - input is focused.
     * - input is not focused but has a non-null value.
     */
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
    flex: 1;
    margin: 0 5px;

    &:first-of-type {
      margin-left:0;
    }

    &:last-of-type {
      margin-right: 0;
    }
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

  .toggle-password-visibility {
    position: absolute;
    right: 5px;
    top: -22px;
    font-size: .8em;
    opacity: 0;
    cursor: pointer;

    span {
      margin-left: 5px;
    }
  }

  .password-strength-meter {
    position: absolute;
    left: 0;
    top: 70px;
    width: 100%;
    opacity: 0;
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

    .password-strength-meter {
      opacity: 1;
    }

    .toggle-password-visibility {
      opacity: .6;

      &:hover {
        opacity: .8;
      }
    }
  }

  &.invalid {
    border-left: 4px solid #e74c3c;
  }
}
</style>

<template>
  <div class="password-strength-meter">

    <div class="meter" :data-strength="strength">
      <div class="dot" :class="isActive(0)"></div>
      <div class="dot" :class="isActive(1)"></div>
      <div class="dot" :class="isActive(2)"></div>
      <div class="dot" :class="isActive(3)"></div>
      <div class="dot" :class="isActive(4)"></div>
    </div>

    <div class="label" :data-strength="strength">
      {{strengthLabel}}
    </div>

  </div>
</template>

<script>
export default {
  props: {
    strength: {
      type: Number,
      default: 0
    }
  },
  computed: {
    /**
     * Returns a textual interpretation of the current ZXCVBN score
     */
    strengthLabel: function () {
      switch (this.strength) {
        case 0:
          return 'Very weak'
          break
        case 1:
          return 'Weak'
          break
        case 2:
          return 'Insufficient'
          break
        case 3:
          return 'Good'
          break
        case 4:
          return 'Strong'
          break
      }
    }
  },
  methods: {
    /**
     * Returns active if index ( parameter ) is inferior or equal to current ZXCVBN score
     * Parameters:
     * - (Int) index : the dot index.
     */
    isActive: function (index) {
      if (index <= this.strength) {
        return 'active'
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="less">
.password-strength-meter {

  .meter {
    width: 100%;
    display: flex;

    &[data-strength='0'] {
      .dot.active { background: #c0392b; }
    }

    &[data-strength='1'] {
      .dot.active { background: #e74c3c; }
    }

    &[data-strength='2'] {
      .dot.active { background: #e67e22; }
    }

    &[data-strength='3'] {
      .dot.active { background: #f1c40f; }
    }

    &[data-strength='4'] {
      .dot.active { background: #27ae60; }
    }

    .dot {
      flex: 1;
      height: 4px;
      background: rgba(0,0,0,.2);
      margin: 0 3px;

      &:first-of-type {
        margin-left: 0;
      }

      &:last-of-type {
        margin-right: 0;
      }
    }
  }

  .label {
    font-size: .8em;
    text-transform: uppercase;
    font-weight: 600;
    margin-top: 10px;

    &[data-strength='0'] {
      color: #c0392b;
    }

    &[data-strength='1'] {
      color: #e74c3c;
    }

    &[data-strength='2'] {
      color: #e67e22;
    }

    &[data-strength='3'] {
      color: #f1c40f;
    }

    &[data-strength='4'] {
      color: #27ae60;
    }
  }
}
</style>

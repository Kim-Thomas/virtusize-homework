<template>
  <a :href="to" :class="btnClass">
    {{label}}
  </a>  
</template>

<script>
export default {
  props: {
    btnClass: {
      type: String,
      default: 'btn btn--big btn--ghost'
    },
    label: {
      type: String,
      default: 'Default Label'
    },
    to: {
      type: String,
      default: '#'
    }
  }
}
</script>

<style lang="less">
.btn {
  display: inline-block;
  text-decoration: none;
  font-weight: 600;
  border: .5px solid #16C6B9;
  box-shadow: 0 0 2px #16C6B9;
  background: #16C6B9;
  color: white;
  font-size: 14px;
  border-radius: 3px;
  margin: 0 10px;

  &:first-of-type {
    margin-left:0;
  }

  &:last-of-type {
    margin-right: 0;
  }

  &--big {
    padding: 15px 35px;
  }

  &--ghost {
    background: none;
    color: #16C6B9;
  }
}
</style>

<template>
  <div class="wardrobe">
    <img :src="Monitor" class="placeholder-image">
    <h1 class="placeholder-title">Working on it...</h1>
  </div>
</template>

<script>
import Monitor from '@/assets/images/monitor.svg'

export default {
  computed: {
    Monitor: function() {
      return Monitor;
    }
  }
}
</script>

<style lang="less">
.wardrobe {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .placeholder-image {
    max-width: 60%;
    max-height: 60%;
  }

  .placeholder-title {
    margin-top: 60px;
    font-size: 2em;
    font-weight: 400;
    font-style: italic;
    opacity: .2;
  }
}
</style>


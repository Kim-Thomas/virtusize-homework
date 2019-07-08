<template>
  <div class="home">
    <HomepageSidebar />
    <FeaturesSlider />
  </div>
</template>

<script>
import HomepageSidebar from '@/components/macro/HomepageSidebar.vue';
import FeaturesSlider from '@/components/macro/FeaturesSlider.vue';

export default {
  name: 'home',
  components: {
    HomepageSidebar,
    FeaturesSlider
  },
  mounted: function() {
    let app = this;
  }
}
</script>

<style lang="less">
.home {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 460px 1fr;
  background: #24C6DC;
  background: -webkit-linear-gradient(to top left, #514A9D, #24C6DC);
  background: linear-gradient(to top left, #514A9D, #24C6DC);
}
</style>


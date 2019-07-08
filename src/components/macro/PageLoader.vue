
<template>
  <div class="fullpage-container page-loader">
    <svg width="300" height="300" viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" class="animated-svg">
      <path class="outer-v" d="M150 217.267L55 83H82.5806L150 174.545L214.355 83H245L150 217.267Z" fill="#16C6B9" stroke="#16C6B9" stroke-width="4"/>
      <path class="inner-v" d="M110.439 83H82.8667L150.265 174.2L214.6 83H190.091L150.265 137.72L110.439 83Z" fill="#262929" stroke="#262929" stroke-width="4"/>
    </svg>
  </div>
</template>

<script>

export default {
  name: 'page-loader',
  methods: {
    animateLogo() {
      let $paths = $('.animated-svg path');
      let $inner_v = $('.animated-svg .inner-v');
      let $outer_v = $('.animated-svg .outer-v');
      $outer_v.css('transform', 'translateY(50px');
      $inner_v.css('transform', 'translateY(-50px');
      $paths.each(function(index, $path) {
        let length = $path.getTotalLength();
        $($path).css('fill-opacity', 0);
        // Clear any previous transition
        $path.style.transition = $path.style.WebkitTransition = 'none';
        // Set up the starting positions
        $path.style.strokeDasharray = length + ' ' + length;
        $path.style.strokeDashoffset = length;
        // Trigger a layout so styles are calculated & the browser
        // picks up the starting position before animating
        $path.getBoundingClientRect();
        // Define our transition
        $path.style.transition = $path.style.WebkitTransition = 'transform 2s ease-in-out, stroke-dashoffset 2s ease-in-out';
        // Go!
        $path.style.strokeDashoffset = '0';

        setTimeout(function() {
          $($path).css('transform', 'translateY(0)');
        }, 300);
        setTimeout(function() {
          $($path).animate({'fill-opacity': 1}, 500);
        }, 2000);
      });      
    },
    hidePageLoader() {
      $('.page-loader').fadeOut();
    }
  },
  mounted: function() {
    let app = this;

    app.animateLogo();

    app.$root.$on('pageIsLoaded', function() {
      app.hidePageLoader();
    });
  }
}
</script>

<style lang="less">
.fullpage-container {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

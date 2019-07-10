<template>
  <div class="features-slider">

    <div class="feature" v-for="(feature,index) in features"
      :key="index"
      v-bind:class="{ active: isActive(index) }"
      :style="'transform: translateX(-'+offset_left+'px)'">
      <img :src="feature.illustration" class="feature__illustration">
      <h3 class="feature__title">
        {{feature.title}}
      </h3>
      <p class="feature__description">
        {{feature.description}}
      </p>
    </div>

    <div class="slider-nav">
      <div class="slider-nav__dot"
        v-for="(feature,index) in features"
        :key="index"
        v-bind:class="{ active: isActive(index) }"
        v-on:click="goToSlide(index)">
      </div>
    </div>

  </div>
</template>

<script>
import HavingFun from '@/assets/images/having-fun.svg'
// import Shopping from '@/assets/images/shopping.svg'
import OnlineShopping from '@/assets/images/online-shopping.svg'
import Booking from '@/assets/images/booking.svg'
// import EverywhereTogether from '@/assets/images/everywhere-together.svg'

let swipe = require('jquery-touchswipe')

export default {
  data: function () {
    return {
      active_item: 0,
      offset_left: 0,
      features: [
        {
          illustration: OnlineShopping,
          title: '20% Increased Sales',
          description: 'By removing the uncertainty around size and fit, Virtusize increases average order values by 20%.'
        },
        {
          illustration: Booking,
          title: '30% Decreased Return Rates',
          description: 'By removing the uncertainty around size and fit, Virtusize increases average order values by 20%.'
        },
        {
          illustration: HavingFun,
          title: '90% Enhanced customer experience',
          description: 'By removing the uncertainty around size and fit, Virtusize increases average order values by 20%.'
        }
      ]
    }
  },
  methods: {
    /**
     * Determines if a slide is active or not based on its index.
     * Parameters:
     * - (Int) index : the slide index.
     */
    isActive: function (index) {
      let is_active
      index === this.active_item ? is_active = true : is_active = false
      return is_active
    },
    /**
     * Jumps to a specific slide.
     * Parameters:
     * - (Int) index : index of the slide to jump to.
     */
    goToSlide: function (index) {
      let app = this
      app.active_item = index
      app.offset_left = app.active_item * $('.features-slider').outerWidth()
    },
    /**
     * Navigate to the previous slide if there is one.
     */
    goToPrevSlide: function () {
      let app = this
      if (app.active_item > 0) {
        app.active_item--
        app.offset_left = app.active_item * $('.features-slider').outerWidth()
      }
    },
    /**
     * Navigate to the next slide if there is one.
     */
    goToNextSlide: function () {
      let app = this
      if (app.active_item < app.features.length - 1) {
        app.active_item++
        app.offset_left = app.active_item * $('.features-slider').outerWidth()
      }
    }
  },
  mounted: function () {
    let app = this

    // Note: Swipe gesture support.
    $('.features-slider').swipe({
      swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
        if (direction === 'left') {
          app.goToNextSlide()
        }
        if (direction === 'right') {
          app.goToPrevSlide()
        }
      },
      threshold: 75
    })
  }
}
</script>

<style lang="less">
@feature_width: 500px;

.features-slider {
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  -ms-grid-column: 2;

  .feature {
    display: block;
    text-align: center;
    color: white;
    min-width: 100%;
    opacity: 0;
    transition: .5s ease-in-out;

    &__illustration {
      width: 90%;
      max-height: 300px;
      max-width: @feature_width;
      transform: translateY(-50px);
      transition: .5s ease-in-out;
    }

    &__title {
      font-size: 1.8em;
      font-weight: 400;
      margin: 0 auto;
      margin-top: 60px;
      max-width: @feature_width;
      transform: translateY(50px);
      transition: .5s ease-in-out;
    }

    &__description {
      font-size: 1em;
      line-height: 180%;
      margin: 20px auto;
      opacity: .8;
      max-width: @feature_width;
      transform: translateY(50px);
      transition: .5s ease-in-out;
    }

    &.active {
      opacity: 1;
      transition: transform 1s ease-in-out, opacity 2s;

      .feature__illustration, .feature__title, .feature__description {
        transform: translateY(0px);
        transition: transform 1s;
      }
    }
  }

  .slider-nav {
    position: absolute;
    width: 100%;
    bottom: 70px;
    text-align: center;

    &__dot {
      display: inline-block;
      width: 60px;
      height: 10px;
      border-radius: 5px;
      background: rgba(255,255,255,.2);
      margin: 0 5px;
      cursor: pointer;
      transition: .5s;

      &:hover {
        background: rgba(255,255,255,.4);
      }

      &.active {
        width: 90px;
        background: rgba(255,255,255,.8);
        transition: .5s;
      }
    }
  }
}
</style>

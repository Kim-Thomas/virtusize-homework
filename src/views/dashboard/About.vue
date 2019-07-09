<template>
  <div class="about-page">
    <div class="container">
      <h1>About this Homework</h1>

      <p>
        This homework was made by Thomas Kim for Virtusize.
      </p>

      <p>
        I've been using the following resources for its development:
      </p>

      <li>
        Vue.js
      </li>
      <li>
        VueX ( store )
      </li>
      <li>
        Vue Router ( router )
      </li>
      <li>
        ZXCVBN ( password strength )
      </li>
      <li>
        Vue-toasted ( toast notifications )
      </li>
      <li>
        Font-awesome <i>via</i> vue-fontawesome ( icons )
      </li>
      <li>
        jQuery touchswipe ( homepage's slider touch gesture )
      </li>
      <li>
        Vue-svg-loader ( handling of svg files )
      </li>
      <li>
        Less ( CSS precompiler )
      </li>

      <p>
        This has been tested on different devices ( phone, tablet and laptop ) and different browsers ( IE11, Edge, Chrome, Firefox ).
      </p>
    </div>
  </div>
</template>

<style lang="less">
.about-page {
  width: 100%;
  height: 100%;

  .container {
    width: 90%;
    max-width: 660px;
    margin: auto;
    margin-top: 60px;
    font-size: 18px;

    li {
      margin: 10px 0;
      padding-left: 20px;
    }
  }
}
</style>


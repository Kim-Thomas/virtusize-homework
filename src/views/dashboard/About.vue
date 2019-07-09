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
        <b>Vue.js</b>
      </li>
      <li>
        <b>VueX</b> ( store )
      </li>
      <li>
        <b>Vue Router</b> ( router )
      </li>
      <li>
        <b>ZXCVBN</b> ( password strength )
      </li>
      <li>
        <b>Vue-toasted</b> ( toast notifications )
      </li>
      <li>
        <b>Font-awesome</b> <i>via</i> <b>vue-fontawesome</b> ( icons )
      </li>
      <li>
        <b>jQuery touchswipe</b> ( homepage's slider touch gesture )
      </li>
      <li>
        <b>Vue-svg-loader</b> ( handling of svg files )
      </li>
      <li>
        <b>Less</b> ( CSS precompiler )
      </li>
      <li>
        <b>Babel</b> ( IE11 compatibility )
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

    p {
      line-height: 180%;
    }

    li {
      margin: 10px 0;
      padding-left: 20px;

      i {
        margin: 0 5px;
      }
    }
  }
}
</style>


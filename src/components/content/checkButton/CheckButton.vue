<template>
  <div class="check-button">
    <!--<div class="icon-selector" :class="{'selector-active': checked}" @click="selectItem">-->
      <!--<img src="~assets/img/cart/tick.svg" alt="">-->
    <!--</div>-->
    <div class="icon-selector" :class="{checked:isChecked}">
      <img src="~assets/img/cart/tick.svg" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "CheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border: 2px solid #aaa;
  }
  .checked {
    border-color: red;
    background-color: red;
  }
</style>

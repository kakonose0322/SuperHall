<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <cart-list></cart-list>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import CartList from './childComps/CartList'
  import { mapGetters } from 'vuex'
  export default {
    name: "cart",
    components: {
      NavBar,
      CartList
    },
    computed: {
     // ...mapGetters(['cartLength', 'cartList'])
      ...mapGetters({
        length: 'cartLength'
        // list: 'cartList'
      })
    }
  }
</script>

<style scoped>
  #cart {
    /*position: relative;*/
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }


</style>

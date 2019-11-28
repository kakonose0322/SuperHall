<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item v-for="(item,index) in cartList" :key="index" :item-info="item"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
  import scroll from 'components/common/scroll/scroll'
  import CartListItem from './CartListItem'
  import { mapGetters } from 'vuex'

	export default {
		name: "CartList",
    components: {
      scroll,
      CartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    activated() {
		  this.$refs.scroll.refresh
    }
    // props: {
		//   cartList: {
		//     type: Array,
    //     default() {
		//       return []
    //     }
    //   }
    // }
	}
</script>

<style scoped>
  /*.cart-list {*/
    /*position: absolute;*/
    /*top: 44px;*/
    /*bottom: 49px;*/
    /*width: 100%;*/
  /*}*/
  .cart-list {
    height: calc(100% - 44px - 49px);
  }
  .content {
    height: 100%;
    overflow: hidden ;
  }
</style>

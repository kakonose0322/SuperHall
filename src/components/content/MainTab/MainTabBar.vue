<template>
    <tab-bar>
      <!--activeClass="blue"-->
      <tab-bar-item path="/home">
        <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="shouye">
        <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="shouye">
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category">
        <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="category">
        <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="category">
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart">
        <img slot="item-icon" src="~assets/img/tabbar/cart.svg" alt="cart">
        <img slot="item-icon-active" src="~assets/img/tabbar/cart_active.svg" alt="cart">
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile">
        <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="profile">
        <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="profile">
        <div slot="item-text">我的</div>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
  import TabBar from 'components/common/tabbar/TabBar'
  import TabBarItem from 'components/common/tabbar/TabBarItem'

  export default {
    name: "MainTabBar",
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>

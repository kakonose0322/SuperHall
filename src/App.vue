<template>
  <div id="app">
    <div>
      <keep-alive exclude="Details">
        <router-view></router-view>
      </keep-alive>
      <main-tab-bar></main-tab-bar>
    </div>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/MainTab/MainTabBar'
export default {
  name: 'app',
  components: {
    MainTabBar
  }
}
</script>
<style>
  @import "assets/css/base.css";
</style>

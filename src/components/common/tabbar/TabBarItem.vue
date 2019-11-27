<template>
  <div class="tab-bar-item" @click="itemClick">
    <!--方式一:这样会把图片之类的写死-->
    <!--<img src="../../assets/img/tabbar/home.svg" alt="">-->
    <!--<div>首页</div>-->
    <!--方式二:插槽替换法,注意需要做个取反操作-->
    <!--注意vue这边是做替换,所以尽量将要替换的东西包裹进一个div中,然后对div做操作-->
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <!--<div :class="{active: isActive}">-->
      <!--<slot name="item-text"></slot>-->
    <!--</div>-->
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeClass: {
        type: String,
        default: 'red'
      }
    },
    // data() {
    //   return {
    //     isActive: true
    //   }
    // },
    computed: {
      isActive() {
        // /home -> item1(/home) = true
        // /home -> item1(/category) = false
        // /home -> item1(/cart) = false
        // /home -> item1(/profile) = false
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        // 双击报错解决方案
        // if (this.$route.path == this.path){
        //   return
        // }
        return this.isActive ? {color:this.activeClass} : {}
      }
    },
    methods: {
      itemClick(){
        // console.log('itemClick');
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  /*.active {*/
    /*color: red;*/
  /*}*/
</style>

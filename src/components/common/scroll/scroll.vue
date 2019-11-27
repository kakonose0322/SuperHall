<template>
  <!--ref，主要绑定到子组件上面，用以确定子组件对象-->
  <div class="wrapper" ref="swiper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "scroll",
    props:{
      probeType:{
        type: Number,
        default: 1,
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.swiper,{
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad
      })

      // 2.监听滚动位置
      if (this.probeType ===2 || this.probeType ===3){
        this.scroll.on('scroll',(position) => {
          // console.log(position);
          this.$emit('scroll',position)
        })
      }

      // 3.监听滚动到底部，加层判断是否在底部，只有到底部才加载
      if (this.pullUpLoad){
        this.scroll.on('pullingUp',() => {
          // console.log('More');
          this.$emit('pullingUp')
        })
      }
    },
    components: {
    },
    methods: {
      scrollTo(x,y,time=300) {
        // 如果前面为空后面的直接不跳了
        this.scroll && this.scroll.scrollTo(x,y,time)
      },
      finshPullUp() {
        this.scroll.finshPullUp()
      },
      ref111() {
        console.log('----');
        this.scroll && this.scroll.refresh()
      },
      getY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>

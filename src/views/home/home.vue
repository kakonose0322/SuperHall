<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <tab-control :title="['流行','新款','精选']"
                 @tabClick="tabClick" ref="tabControl"
                 class="tabControl1" v-show="isTabFixed"></tab-control>

    <scroll class="content" ref="scroll" :probe-type="3"
            @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>

      <tab-control :title="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>

      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBT"></back-top>
    <!--<swiper>-->
      <!--<swiper-item v-for="item in banners">-->
        <!--<a :href="item.link">-->
          <!--<img :src="item.image" alt="点击查看详情">-->
        <!--</a>-->
      <!--</swiper-item>-->
    <!--</swiper>-->
  </div>
</template>

<script>
  import {debounce} from 'common/utils'
  import NavBar from 'components/common/navbar/NavBar'
  import {getHomeMultidata,getHomeGoods} from "network/home";
  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'
  import TabControl from 'components/content/tabcontrol/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import scroll from 'components/common/scroll/scroll'
  import BackTop from 'components/content/backtop/BackTop'
  // import Swiper from 'components/common/swiper/Swiper'
  // import SwiperItem from 'components/common/swiper/SwiperItem'
  // 注意：这里之所以可以一起导出是因为index中做了导出
  // import {Swiper,SwiperItem} from 'components/common/swiper'
  export default {
    name: "home",
    data() {
      return{
        banners: [],
        recommends: [],
        goods: {
          'pop': {page:0,list:[]},
          'new': {page:0,list:[]},
          'sell': {page:0,list:[]},
        },
        currentType: 'pop',
        isShowBT: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        itemImgListener: null
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      scroll,
      BackTop
    },
    destroyed() {
      console.log('home destroyed');
    },
    activated() {
      // this.$refs.scroll.scrollTo(0,-this.saveY,0)
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.ref111()
    },
    deactivated() {
      // this.saveY = 1000
      this.saveY = this.$refs.scroll.getY()
      // console.log(this.saveY);
      // 2.取消全局事件的监听
      this.$bus.$off('itemImgLoad',this.itemImgListener)
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()

      // 2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

      // 3.赋值
      // 所有的组件都有一个属性$el: 用于获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop);
    },
    mounted() {
      // 注意：一下这句的函数传入不能加()，因为带()的意思是传入返回值，不带是传入函数
      // this.debounce(this.$refs.scroll.ref111,500)
      const refresh = debounce(this.$refs.scroll.ref111,1)
      // 3.监听item图片加载完成，尽量不要在created时执行，因为那里的scroll还是有可能为空
      // 对监听事件进行保存
      this.itemImgListener = () => {
        refresh()
      }
      this.$bus.$on('itemImgLoad',this.itemImgListener)

    },
    methods: {
      /**
       * 网络请求相关方法
       */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          // console.log(res)
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          this.$refs.scroll.scroll.refresh()
        })
      },
      /**
       * 事件监听相关的方法
       */
      tabClick(index){
        // console.log(index);
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 3:
            this.currentType = 'sell'
            break
        }

        this.$refs.tabControl.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick() {
        this.$refs.scroll.scroll.scrollTo(0,0)
      },
      contentScroll(position){
        // console.log(position); // 判断backtop是否显示
        this.isShowBT = (-position.y) > 1000
        // 决定tabControl是否吸顶(position:fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        // console.log('More');
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.scroll.refresh()
      },
      swiperImageLoad() {
        // console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }
      // 防抖函数:传入要等的函数，以及等待时长
      // debounce(func,delay) {
      //   let timer = null
      //   return function (...args) {
      //     if (timer) clearTimeout(timer)
      //     timer = setTimeout(() => {
      //       func.apply(this,args)
      //     },delay)
      //   }
      // }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    /*height: 100vh;*/
    /*margin-bottom: 44px;*/
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    /*原生下拉时使用的坐标*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }
  .tab-control {
    position: sticky;
    /*top: 44px;*/
    z-index: 9;
  }
  .tabControl {
    position: relative;
    z-index: 9;
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 44px;
    left: 0;
    right: 0;
  }
  .fixed {
    position: fixed;
    left: 0;
    right: 0;
    top: 44px;
  }
  /*.content {*/
    /*height: calc(100% - 93px);*/
    /*overflow: hidden;*/
    /*margin-top: 44px;*/
  /*}*/
</style>

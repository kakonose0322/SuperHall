<template>
  <div id="detail">
    <details-nav  class="detail-nav" @titieClick="titleClick" ref="nav"></details-nav>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <!--验证是否添加进入列表-->
      <!--<ul>-->
        <!--<li v-for="item in $store.state.cartlist">-->
          <!--{{item}}-->
        <!--</li>-->
      <!--</ul>-->
      <!--<div>{{$store.state.cartlist.length}}</div>-->
      <details-swiper :top-images="topImages"></details-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addToCart="addToCart"/>
    <toast :message="message" :show="show"></toast>
    <!--<toast message="message"></toast>-->
  </div>
</template>

<script>
  import DetailsNav from './childComps/DetailsNav'
  import {getDetails,Goods,Shop,GoodsParam,getRecommend} from "network/details";
  import DetailsSwiper from './childComps/DetailsSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import scroll from 'components/common/scroll/scroll'
  import Toast from 'components/common/toast/Toast'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import GoodsList from 'components/content/goods/GoodsList'
  import {debounce} from 'common/utils'
  import DetailBottomBar from './childComps/DetailBottomBar'
  import BackTop from 'components/content/backtop/BackTop'
  import { mapActions } from 'vuex'
  export default {
    name: "Details",
    data() {
      return {
        iid: null,
        res: null,
        topImages: null,
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        itemImgListener: null,
        themeTopYs: [0,1000,2000,3000],
        isShowBackTop: false,
        message: '',
        show: false
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid
      // 2.根据iid请求数据
      // console.log(this.iid);
      getDetails(this.iid).then(res => {
        // console.log(res);
        const data = res.result
        // console.log(data.itemInfo.lowPrice);
        // console.log(res.result.itemInfo);
        // 顶部轮播图数据
        this.topImages = res.result.itemInfo.topImages
        // 2.获取商品数据 res.result.itemInfo
        // console.log(data.itemInfo);
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // 3.获取店铺信息
        this.shop = new Shop(data.shopInfo)
        // 4.获得详情
        this.detailInfo = data.detailInfo
        // 5.获得商品信息
        this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
        // 7.取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        // 1.第一次获取，值不对，
        // 值不对的原因: this. $refs. params.$el压根没有渲染
        // this.themeTopYs = []
        // this.themeTopYs.push(0);
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        // this.$nextTick(() => {
          //根据最新的数据，对应的DOM是已经被渲染出来
          // 但是图片依然是没有加载完(目前获取到offsetTop不包含其中的图片).
          // offsetTop值 不对的时候，都是因为图片的问题
          // this.themeTopYs = []
          // this.themeTopYs.push(0);
          // this.themeTopYs.push( this.$refs.params.$el.offsetTop)
          // this.themeTopYs.push( this.$refs.comment.$el.offsetTop)
          // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
          // console.log(this.themeTopYs);
        // })
      })

      // 3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })
    },
    components: {
      DetailsNav,
      DetailsSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
      BackTop,
      Toast
    },
    methods: {
      // ...mapActions({
      //   add: 'addCart'
      // }),
      ...mapActions(['addCart']),
      imageLoad() {
        this.$refs.scroll.ref111()
        this.themeTopYs = []
        this.themeTopYs.push(0);
        this.themeTopYs.push( this.$refs.params.$el.offsetTop)
        this.themeTopYs.push( this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs);
      },
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      contentScroll(position) {
        // console.log(position);
        // 1.获取y值
        const positoinY = -position.y
        // 2.positoinY和主 题中值进行对比
        // [0, 7938， 9120， 9452]
        // positoinY在0和7938之间，index=0
        // positoinY在=7938 和9120之间，index = 1
        // positoinY在9120和9452之间，index = 2
        // positoinY 大于等于9120 值，index = 3
        let length = this.themeTopYs.length
        // for (let i = 0; i < length; i++) { //这个是传统判断采用的
        for (let i = 0; i < length-1; i++) {
          // if (positoinY > this. themeTopYs[i] && positoinY < this. themeTopYs[i+1]) {
          // console.log(i);
          // }
          if (this.currentIndex !== i && (positoinY >= this.themeTopYs[i] && positoinY <
            this.themeTopYs[i+1])) {
            this .currentIndex = i ;
            this.$refs.nav.currentIndex = this.currentIndex
          }

        //   if (this.currentIndex !== i && ((i < length - 1 && positoinY >= this.themeTopYs[i]
        //   && positoinY < this.themeTopYs[i + 1]) || (i === length - 1 && positoinY
        //   >= this.themeTopYs[i]))) {
        //   this.currentIndex = i;
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }
      }

        // 3.是否显示回到顶部
        this.isShowBackTop = (-position.y) > 300
      },
      backTop() {
        this.$refs.scroll.scrollTo(0,0,200)
      },
      addToCart() {
        // console.log('-----');
        // 1.获取购物车所需的商品信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.lowPrice
        product.iid = this.iid
        // console.log(product.price);

        // 2.将商品加入到购物车中
        // 注意这里虽然可以使用push直接插入数组到cartlist但不推荐
        // 这里是之前发送给mutation的方法
        // this.$store.commit('addCart',product)
        // 现在发送给actions
        // this.$store.dispatch('addCart',product).then(res => {
        //   console.log(res);
        // })
        // 利用getActions实现addCart
        this.addCart(product).then(res => {
          // console.log(product);
          // 提取为插件前的方法
          // this.show = true;
          // this.message = res
          // // 设置延迟消失
          // setTimeout(() => {
          //   this.show = false;
          //   this.message = ''
          // },1500)
          // this.$toast.show(res,1500)
          this.$toast.show(res)
        })

        // 3.添加到购物车成功（弹出层）

      }
    },
    // updated() {
    //   this.themeTopYs = []
    //   // 为导航参数插入对应的跳转值
    //   this.themeTopYs.push(0)
    //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    // },
    mounted() {
      let ref1111 = debounce(this.$refs.scroll.ref111,100)
      this.itemImgListener = () => {
        ref1111()
      }
      this.$bus.$on('imageLoad',this.itemImgListener)
    },
    destroyed() {
      this.$bus.$off('imageLoad',this.itemImgListener)
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh;
  }
  .content {
    height: calc(100% - 44px - 58px);
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>

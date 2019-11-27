<template>
  <div id="detail">
    <details-nav  class="detail-nav"></details-nav>
    <scroll class="content" ref="scroll">
      <details-swiper :top-images="topImages"></details-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <goods-list :goods="recommends"></goods-list>
    </scroll>
  </div>
</template>

<script>
  import DetailsNav from './childComps/DetailsNav'
  import {getDetails,Goods,Shop,GoodsParam,getRecommend} from "network/details";
  import DetailsSwiper from './childComps/DetailsSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import scroll from 'components/common/scroll/scroll'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import GoodsList from 'components/content/goods/GoodsList'
  import {debounce} from 'common/utils'
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
        itemImgListener: null
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid
      // 2.根据iid请求数据
      console.log(this.iid);
      getDetails(this.iid).then(res => {
        // console.log(res);
        const data = res.result
        // console.log(data);
        // console.log(res.result.itemInfo);
        // 顶部轮播图数据
        this.topImages = res.result.itemInfo.topImages
        // 2.获取商品数据 res.result.itemInfo
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
      GoodsList
    },
    methods: {
      imageLoad() {
        this.$refs.scroll.ref111()
      }
    },
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
    height: calc(100% - 44px);
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>

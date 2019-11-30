<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button :is-checked="isSelectAll" class="check-button" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="calculate" @click="calcClick">
      去计算：({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  import { mapGetters } from 'vuex'
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice () {
        // 注意：在引入mapGetters以后相当于定义了本地cartlist变量所以可以直接使用
        // this.$store.state.cartlist就变成了this.cartlist
        // return '￥' + this.cartList.filter(item => {
        //   return item.checked
        // }).reduce((preValue,item) => {
        //   return preValue + item.price * item.count
        // },0).toFixed(2)
        const total =  '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
        return total
      },
      checkLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        // 注意：这里里面取反是因为明显判断数组为空比较方便，外边的取反是根据里面来的
        // return (!this.cartList.filter(item => !item.checked).length)
        // 有一个不选中就是false,另外长度为0时需要个特殊处理
        if (this.cartList.length === 0) return false
        return !this.cartList.find(item => !item.checked)
        // 遍历法：
        // for (let item of this.cartList) {
        //   if (!item.checked) {
        //     return false
        //     return true
        //
        //   }
        // }
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) { //全部选中
          this.cartList.forEach(item => item.checked = false)
        } else {//部分或全部不选中
          this.cartList.forEach(item => item.checked = true)
        }
        // 这里无法使用以下简写方式是因为在遍历时会改变cartList的值
        // this.cartlist.forEach(item => item.checked = !this.isSelectAll)
      },
      calcClick() {
        // 判断全选是否为空，如果为空，则提示选择物品
        if (!this.isSelectAll) {
          this.$toast.show('请选择要购买的商品',2000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;

    background-color: #eee;
    font-size: 14px;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    /*注意这里如果不设置行高会继承bottom-bar的行高*/
    line-height: 20px;
    margin-left: 5px;
  }
  .price {
    margin-left: 25px;
    /*这里是左边以及最后设置固定宽度，中间即可设置占据全部*/
    flex: 1;
  }
  .calculate {
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>

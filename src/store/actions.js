export default {
  addCart(context, payload) {
    // payload新添加的商品 push/pop/unshift/shift/sort/reverse/map/filter/reduce/join
    // let oldProduct = null;
    // for (let item of state.cartlist) {
    //   if (item.iid === payload.iid) {
    //     oldProduct = item;
    //   }
    // }
    // 方法二：
    // let index = state.cartlist. indexof (payload)
    // if (index === -1) {
    //   let oldProduct = state.cartlist [ index ]
    // 方法三
    // let product = state.cartlist.find(function (item) {
    //   return item.iid === payload.iid
    // }
    let oldProduct = context.state.cartlist.find(item => item.iid === payload.iid)
    // if (product){

    // 2.判断oldProduct
    if (oldProduct) {
      // oldProduct.count += 1
      context.commit('addCounter',oldProduct)
    } else {
      payload.count = 1
      // state.cartlist.push(payload)
      context.commit('addMyCart',payload)
    }
  }
}

export default {
  // mutations唯 的目的就是 修改state中状态
  // mutations中的每个方法尽可能完成的事件比较单一
  addCounter(state,payload) {
    payload.count++
  },
  addMyCart(state,payload) {
    payload.checked = true
    state.cartlist.push(payload)
  }
}

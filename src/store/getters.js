const getters = {
  cartLength(state) {
    return state.cartlist.length
  },
  cartList(state) {
    return state.cartlist
  }
}

export default getters

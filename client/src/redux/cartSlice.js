import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: [],
  total: null
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.data.find((item) => item.id === action.payload.id)
      if (itemInCart) {
        itemInCart.quantity++
      } else {
        state.data.push(action.payload)
      }
    },
    removeFromCart: (state, action) => {
      state.data = state.data.filter((item) => item.id !== action.payload.id)
    },
    subtractQuantity: (state, action) => {
      const itemInCart = state.data.find((item) => item.id === action.payload.id)
      if (itemInCart.quantity === 1) {
        state.data = state.data.filter((item) => item.id !== action.payload.id)
      } else {
        itemInCart.quantity--
      }
    },
    clearCart: (state, action) => {
      state.data = []
    },
    addTotal: (state, action) => {
      state.total = action.payload
    }
  }
})

export const { addToCart, removeFromCart, subtractQuantity, addTotal, clearCart } = cartSlice.actions

export default cartSlice.reducer

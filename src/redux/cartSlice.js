import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
};

const findCartItem = (state, id) => state.items.find((item) => item.id === id);
const calculateTotal = (items) => items.reduce((total, item) => total + item.amount * item.quantity, 0);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = findCartItem(state, action.payload.id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }

      state.total = calculateTotal(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      state.total = calculateTotal(state.items);
    },
    decreaseQuantity: (state, action) => {
      const itemInCart = findCartItem(state, action.payload.id);
      if (itemInCart.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload.id);
      } else {
        itemInCart.quantity--;
      }

      state.total = calculateTotal(state.items);
    },

    clearCart: (state) => {
      state.data = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, decreaseQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;

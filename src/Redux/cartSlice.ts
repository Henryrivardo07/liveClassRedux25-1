// src/Redux/cartSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { RootState } from './store';

// Tipe data untuk item dalam keranjang
interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

// State awal keranjang belanja
interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

// Membuat slice Redux
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      }
    },
  },
});

// Selectors untuk mengoptimalkan performa
export const selectCartItems = (state: RootState) => state.cart.cartItems;

export const selectCartItemsMemoized = createSelector(
  [selectCartItems],
  (cartItems) => cartItems
);

export const selectTotalCartPrice = createSelector(
  [selectCartItems],
  (cartItems) =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
);

// Export actions dan reducer
export const {
  addToCart,
  removeFromCart,
  decrementQuantity,
  incrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;

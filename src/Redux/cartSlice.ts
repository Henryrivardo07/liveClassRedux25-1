// Mengimpor fungsi createSlice dan PayloadAction dari Redux Toolkit
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Mendefinisikan tipe data untuk setiap item dalam keranjang belanja
interface CartItem {
  id: number; // ID unik produk
  title: string; // Nama produk
  price: number; // Harga produk
  image: string; // URL gambar produk
  quantity: number; // Jumlah produk yang dibeli
}

// Mendefinisikan tipe data untuk state keranjang belanja
interface CartState {
  cartItems: CartItem[]; // Array berisi daftar produk yang ditambahkan ke keranjang
}

// State awal keranjang belanja, di mana `cartItems` masih kosong
const initialState: CartState = {
  cartItems: [],
};

// Membuat slice Redux untuk fitur keranjang belanja
const cartSlice = createSlice({
  name: 'cart', // Nama slice yang akan muncul di Redux DevTools
  initialState, // State awal yang sudah didefinisikan di atas
  reducers: {
    // Reducer untuk menambahkan produk ke dalam keranjang belanja
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

    // Reducer untuk menghapus produk dari keranjang belanja berdasarkan ID
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload // Hanya menyisakan item yang ID-nya tidak sama dengan yang ingin dihapus
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

// Mengekspor action agar bisa digunakan di komponen lain
export const {
  addToCart,
  removeFromCart,
  decrementQuantity,
  incrementQuantity,
} = cartSlice.actions;

// Mengekspor reducer agar bisa digunakan dalam store Redux
export default cartSlice.reducer;

/*
Penjelasan Singkat:
CartItem: Tipe data untuk setiap produk dalam keranjang.
CartState: Menyimpan daftar produk dalam cartItems.
initialState: State awal dengan keranjang kosong.
addToCart: Menambahkan produk baru ke dalam cartItems.
removeFromCart: Menghapus produk dari cartItems berdasarkan ID.
Mengekspor reducer dan actions supaya bisa digunakan di store Redux dan di komponen React.
Kirim kode berikutnya kalau ada yang perlu dijelaskan lagi! 🚀
*/

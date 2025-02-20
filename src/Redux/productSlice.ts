import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Interface untuk produk
interface Product {
  id: number; // ID produk
  title: string; // Nama produk
  price: number; // Harga produk
  image: string; // URL gambar produk
}

// Interface untuk state produk di Redux
interface ProductState {
  products: Product[]; // Daftar produk yang disimpan dalam state
  loading: boolean; // Menandakan apakah sedang memuat data
  error: string | null; // Menyimpan pesan error jika ada kesalahan
}

// State awal produk
const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

// Async thunk untuk mengambil daftar produk dari API
export const fetchProducts = createAsyncThunk<Product[], void>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      // Melakukan fetch data dari Fake Store API
      const response = await fetch('https://fakestoreapi.com/products');

      // Jika respons tidak sukses, lempar error
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      return await response.json(); // Mengembalikan hasil JSON sebagai array produk
    } catch (error: any) {
      // Jika ada error, kirim nilai error sebagai reject
      return rejectWithValue(error.message || 'Unknown error');
    }
  }
);

// Slice Redux untuk produk
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {}, // Tidak ada reducer biasa karena menggunakan async thunk
  extraReducers: (builder) => {
    builder
      // Ketika request dimulai, set loading menjadi true dan reset error
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Jika request berhasil, simpan data produk dan hentikan loading
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.products = action.payload;
          state.loading = false;
        }
      )
      // Jika request gagal, simpan pesan error dan hentikan loading
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

// Mengekspor reducer untuk digunakan dalam store Redux
export default productSlice.reducer;

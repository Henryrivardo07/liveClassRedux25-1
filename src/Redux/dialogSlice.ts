import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface untuk state dialog
interface DialogState {
  isOpen: boolean; // Menyatakan apakah dialog sedang terbuka atau tidak
  variant: 'success' | 'info' | 'danger'; // Variasi tampilan dialog
  title: string; // Judul dialog
  message: string; // Pesan dalam dialog
  primaryButtonTitle: string; // Teks tombol utama
  secondaryButtonTitle: string; // Teks tombol sekunder
  isSubmitting: boolean; // Menyatakan apakah dialog dalam proses submit
}

// State awal untuk dialog
const initialState: DialogState = {
  isOpen: false,
  variant: 'info',
  title: '',
  message: '',
  primaryButtonTitle: '',
  secondaryButtonTitle: '',
  isSubmitting: false, // Default dialog tidak dalam proses submit
};

// Membuat slice Redux untuk dialog
const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    // Action untuk membuka dialog dengan data yang diberikan
    openDialog: (
      state,
      action: PayloadAction<Omit<DialogState, 'isOpen' | 'isSubmitting'>>
    ) => {
      return { ...state, ...action.payload, isOpen: true, isSubmitting: false };
    },
    // Action untuk menutup dialog
    closeDialog: (state) => {
      state.isOpen = false;
      state.isSubmitting = false; // Reset isSubmitting saat dialog ditutup
    },
    // Action untuk mengatur status submitting saat proses sedang berlangsung
    setSubmitting: (state, action: PayloadAction<boolean>) => {
      state.isSubmitting = action.payload;
    },
  },
});

// Mengekspor action yang tersedia agar bisa digunakan di komponen lain
export const { openDialog, closeDialog, setSubmitting } = dialogSlice.actions;

// Mengekspor reducer untuk digunakan dalam store Redux
export default dialogSlice.reducer;

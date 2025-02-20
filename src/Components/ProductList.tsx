import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { fetchProducts } from '@/Redux/productSlice'; // Action untuk mengambil produk dari API
import { addToCart } from '@/Redux/cartSlice'; // Action untuk menambahkan produk ke keranjang
import { RootState } from '@/Redux/store';
import { useAppDispatch } from '@/Redux/hooks';
import { openDialog, closeDialog } from '@/Redux/dialogSlice'; // Untuk mengelola dialog konfirmasi
import { showToast } from '@/Redux/toastSlice'; // Untuk menampilkan notifikasi (toast)
import styles from './Styles/ProductList.module.scss'; // Mengimpor file gaya (CSS Module)

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();

  // **Mengambil data produk dari Redux store**
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  // **Mengambil state dialog dari Redux untuk debugging**
  const dialogState = useSelector((state: RootState) => state.dialog);

  // **Gunakan useRef untuk menyimpan aksi konfirmasi**
  const confirmActionRef = useRef<(() => void) | null>(null);

  // **Mengambil data produk saat komponen pertama kali dimuat**
  useEffect(() => {
    dispatch(fetchProducts())
      .unwrap()
      .then((data) => console.log('Fetched products:', data)) // Debug hasil fetch
      .catch((err) => console.error('Failed to fetch products:', err)); // Debug jika gagal
  }, [dispatch]);

  // **Fungsi untuk menangani penambahan produk ke keranjang**
  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product)); // Menambahkan produk ke keranjang
    console.log("Handling 'Add to Cart' action");

    // **Simpan action konfirmasi dalam ref**
    confirmActionRef.current = () => {
      console.log('Adding product to cart:', product);
      dispatch(addToCart(product)); // Tambahkan produk ke keranjang

      // **Tampilkan notifikasi bahwa produk berhasil ditambahkan**
      dispatch(
        showToast({
          message: `${product.title} added to cart!`,
          variant: 'success',
        })
      );
      dispatch(closeDialog()); // Tutup dialog setelah aksi dikonfirmasi
    };

    console.log('Dispatching openDialog...'); // Debug
    dispatch(
      openDialog({
        variant: 'info',
        title: 'Add to Cart',
        message: `Are you sure you want to add ${product.title} to your cart?`,
        primaryButtonTitle: 'Yes, Add',
        secondaryButtonTitle: 'Cancel',
      })
    );
  };

  console.log('Dialog State:', dialogState); // Debug Redux dialog state

  // **Tampilkan loading saat data produk sedang diambil**
  if (loading) return <p className={styles.loading}>Loading...</p>;
  // **Tampilkan error jika terjadi kesalahan saat mengambil produk**
  if (error) return <p className={styles.error}>Error: {error}</p>;

  return (
    <div className={styles.container}>
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id} className={styles.card}>
            <img
              src={product.image}
              alt={product.title}
              className={styles.image}
            />
            <p className={styles.title}>
              {product.title} -{' '}
              <span className={styles.price}>${product.price}</span>
            </p>
            {/* **Tombol untuk menambahkan produk ke keranjang** */}
            <button
              onClick={() => handleAddToCart(product)}
              className={styles.button}
            >
              Add to Cart
            </button>
          </div>
        ))
      ) : (
        <p className={styles.empty}>No products available</p>
      )}

      {/* **Dialog konfirmasi saat menambahkan ke keranjang** */}
      {dialogState.isOpen && confirmActionRef.current && (
        <div className={styles.dialog}>
          <div className={styles.dialogContent}>
            <h2>{dialogState.title}</h2>
            <p>{dialogState.message}</p>
            <button onClick={confirmActionRef.current}>
              {dialogState.primaryButtonTitle}
            </button>
            <button onClick={() => dispatch(closeDialog())}>
              {dialogState.secondaryButtonTitle}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;

/*
Menggunakan useEffect untuk Fetch Produk

dispatch(fetchProducts()) memanggil API produk saat komponen pertama kali dimuat.
unwrap() digunakan untuk menangani hasil dari async thunk.
Menggunakan useRef untuk Konfirmasi Aksi

confirmActionRef menyimpan fungsi yang akan dieksekusi setelah pengguna mengkonfirmasi.
Hal ini menghindari pemanggilan action sebelum pengguna memilih "Yes, Add".
Dialog Konfirmasi (openDialog)

openDialog dibuka saat tombol "Add to Cart" ditekan.
Jika pengguna menekan tombol "Yes, Add", fungsi yang tersimpan di confirmActionRef akan dieksekusi.
Toast (showToast)

Setelah produk berhasil ditambahkan, toast akan muncul dengan pesan keberhasilan.
Error Handling & Loading

Jika loading === true, tampilkan teks "Loading...".
Jika error !== null, tampilkan teks error.

*/

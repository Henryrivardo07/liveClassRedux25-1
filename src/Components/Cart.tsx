import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/Redux/store'; // Mengimpor RootState untuk tipe state Redux
import {
  removeFromCart, // Action untuk menghapus item dari keranjang
  incrementQuantity, // Action untuk menambah jumlah item
  decrementQuantity, // Action untuk mengurangi jumlah item
} from '@/Redux/cartSlice';
import styles from './Styles/Cart.module.scss'; // Mengimpor file gaya (CSS Module)

const Cart: React.FC = () => {
  // **Mengambil data cart dari Redux store**
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch(); // **Mendapatkan fungsi dispatch dari Redux**

  return (
    <div className={styles.container}>
      {/* **Menampilkan pesan jika keranjang kosong** */}
      {cartItems.length === 0 ? (
        <p className={styles.empty}>Cart is empty</p>
      ) : (
        <ul className={styles.list}>
          {/* **Melakukan mapping untuk menampilkan setiap item di keranjang** */}
          {cartItems.map((item) => (
            <li key={item.id} className={styles.item}>
              {/* **Menampilkan gambar produk** */}
              <img src={item.image} alt={item.title} className={styles.image} />

              <div className={styles.info}>
                {/* **Menampilkan nama produk dan harga** */}
                <p className={styles.title}>
                  {item.title} -{' '}
                  <span className={styles.price}>${item.price}</span>
                </p>

                {/* **Bagian untuk menyesuaikan jumlah produk** */}
                <div className={styles.quantity}>
                  {/* **Tombol untuk mengurangi jumlah produk** */}
                  <button onClick={() => dispatch(decrementQuantity(item.id))}>
                    -
                  </button>
                  <span>{item.quantity}</span>{' '}
                  {/* **Menampilkan jumlah produk** */}
                  {/* **Tombol untuk menambah jumlah produk** */}
                  <button onClick={() => dispatch(incrementQuantity(item.id))}>
                    +
                  </button>
                </div>

                {/* **Tombol untuk menghapus produk dari keranjang** */}
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className={styles.button}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;

/*
Penjelasan Kode:
Menggunakan useSelector

cartItems = useSelector((state: RootState) => state.cart.cartItems);
Mengambil daftar item yang ada di dalam keranjang dari Redux store.
Menggunakan useDispatch

dispatch = useDispatch();
Digunakan untuk memanggil action Redux seperti removeFromCart, incrementQuantity, dan decrementQuantity.
Menampilkan daftar produk dalam keranjang

Jika cartItems.length === 0, tampilkan pesan "Cart is empty".
Jika tidak kosong, lakukan .map() untuk menampilkan produk dalam <ul>.
Mengatur jumlah item dalam keranjang

Tombol - memanggil decrementQuantity(item.id) untuk mengurangi jumlah item.
Tombol + memanggil incrementQuantity(item.id) untuk menambah jumlah item.
Menghapus item dari keranjang

Tombol Remove memanggil removeFromCart(item.id), yang menghapus item dari Redux state.
*/

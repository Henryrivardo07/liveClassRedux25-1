import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Redux/store';
import { hideToast } from '@/Redux/toastSlice';
import styles from '../Components/Styles/Toast.module.scss';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaInfoCircle,
} from 'react-icons/fa';

// Fungsi untuk menentukan ikon berdasarkan tipe notifikasi
const getIcon = (variant: 'success' | 'error' | 'info') => {
  switch (variant) {
    case 'success':
      return <FaCheckCircle color='green' size={24} />; // Ikon centang hijau untuk sukses
    case 'error':
      return <FaExclamationCircle color='red' size={24} />; // Ikon tanda seru merah untuk error
    case 'info':
      return <FaInfoCircle color='blue' size={24} />; // Ikon info biru untuk informasi
    default:
      return null;
  }
};

// Komponen Toast
export const Toast: React.FC = () => {
  // Mengambil state toast dari Redux store
  const { message, variant, isVisible } = useSelector(
    (state: RootState) => state.toast
  );

  const dispatch = useDispatch();

  // Efek samping: otomatis menghilangkan toast setelah 3 detik
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => dispatch(hideToast()), 3000); // Set timeout 3 detik
      return () => clearTimeout(timer); // Membersihkan timer jika toast berubah sebelum timeout selesai
    }
  }, [isVisible, dispatch]);

  // Jika toast tidak aktif, tidak merender apa pun
  if (!isVisible) return null;

  return (
    <div
      className={`${styles.toast} ${styles[variant]}`} // Menentukan style berdasarkan variant (success, error, info)
      onClick={() => dispatch(hideToast())} // Klik untuk menutup toast secara manual
    >
      <div className={styles.icon}>{getIcon(variant)}</div>{' '}
      {/* Menampilkan ikon sesuai tipe */}
      <div className={styles.message}>{message}</div>{' '}
      {/* Menampilkan pesan notifikasi */}
    </div>
  );
};

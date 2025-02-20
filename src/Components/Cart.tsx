import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/Redux/store';
import {
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
} from '@/Redux/cartSlice';
import styles from './Styles/Cart.module.scss';

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      {cartItems.length === 0 ? (
        <p className={styles.empty}>Cart is empty</p>
      ) : (
        <ul className={styles.list}>
          {cartItems.map((item) => (
            <li key={item.id} className={styles.item}>
              <img src={item.image} alt={item.title} className={styles.image} />
              <div className={styles.info}>
                <p className={styles.title}>
                  {item.title} -{' '}
                  <span className={styles.price}>${item.price}</span>
                </p>
                <div className={styles.quantity}>
                  <button onClick={() => dispatch(decrementQuantity(item.id))}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(incrementQuantity(item.id))}>
                    +
                  </button>
                </div>
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

import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart } = useCart();

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((book, index) => (
            <div key={index}>
              <h3>{book.title}</h3>
              <p>Price: ${book.price}</p>
            </div>
          ))}
          <button>Proceed to Checkout</button>
        </div>
      )}
      <br />
      <Link to="/">Go to Book List</Link>
    </div>
  );
};

export default Cart;
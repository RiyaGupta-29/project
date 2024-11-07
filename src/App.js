import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext'; // Import CartProvider
import BookList from './components/BookList'; // Import BookList component
import BookDetail from './components/BookDetail'; // Import BookDetail component
import Cart from './components/Cart'; // Import Cart component
import BookForm from './components/BookForm';
import Login  from './components/Login';
const App = () => {
  return (
    <CartProvider> {/* Wrap the entire app with CartProvider to share cart state */}
      <Router> {/* Wrap the routes with Router to enable routing */}
        <div>
          <h1>E-Book Store</h1>
          <Routes>
            <Route path="/login" element={<Login />} /> {/* Route for Book List */}
            <Route path="/add" element={<BookForm />} />
            <Route path="/" element={<BookList />} /> {/* Route for Book List */}
            <Route path="/book/:id" element={<BookDetail />} /> {/* Route for Book Details */}
            <Route path="/cart" element={<Cart />} /> {/* Route for Cart */}
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
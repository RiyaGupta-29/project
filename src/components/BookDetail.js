import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const { addToCart } = useCart(); // Using the addToCart function from CartContext

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/books/${id}/`)
      .then(response => setBook(response.data))
      .catch(error => console.error('Error fetching book details:', error));
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <img src={book.cover_image} alt={book.title} width="200" />
      <p>{book.description}</p>
      <p>Price: ${book.price}</p>
      <button onClick={() => addToCart(book)}>Add to Cart</button>
      <br />
      <Link to="/cart">Go to Cart</Link>
    </div>
  );
};

export default BookDetail;
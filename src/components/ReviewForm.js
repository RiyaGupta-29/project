// src/components/ReviewForm.js
import React, { useState } from 'react';
import axios from 'axios';

function ReviewForm() {
    const [formData, setFormData] = useState({
        book: '',
        user: '',
        rating: '',
        comment: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/reviews/', formData)
            .then(response => {
                console.log('Review posted successfully:', response.data);
            })
            .catch(error => {
                console.error('There was an error posting the review!', error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Submit a Review</h2>
            <input
                type="text"
                name="book"
                placeholder="Book ID"
                value={formData.book}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="user"
                placeholder="User ID"
                value={formData.user}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="rating"
                placeholder="Rating"
                value={formData.rating}
                onChange={handleChange}
                required
            />
            <textarea
                name="comment"
                placeholder="Comment"
                value={formData.comment}
                onChange={handleChange}
                required
            ></textarea>
            <button type="submit">Submit</button>
        </form>
    );
}

export default ReviewForm;

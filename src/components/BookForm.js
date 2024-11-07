import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function BookForm() {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        price: '',
        cover_image: null,
        pdf_file: null,
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.type === 'file' ? e.target.files[0] : e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        for (let key in formData) {
            data.append(key, formData[key]);
        }

        axios.post('http://127.0.0.1:8000/api/books/', data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        .then(response => {
            console.log('Book uploaded successfully', response.data);
        })
        .catch(error => {
            console.error('There was an error uploading the book!', error);
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Upload a New Book</h2>
            <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
            <input type="text" name="author" placeholder="Author" onChange={handleChange} required />
            <input type="number" step="0.01" name="price" placeholder="Price" onChange={handleChange} required />
            <input type="file" name="cover_image" accept="image/*" onChange={handleChange} required />
            <input type="file" name="pdf_file" accept="application/pdf" onChange={handleChange} required />
            <button type="submit">Upload</button>
            <br />
            <Link to="/list">Go to Book List</Link>
        </form>
    );
}

export default BookForm;

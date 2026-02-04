import { useEffect, useState } from 'react';
import axios from '../axios.js';

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('/books/list')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Books</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {books.map(book => (
          <div key={book._id} className="bg-gray-100 p-4 rounded shadow">
            <h3 className="font-bold">{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Status: {book.issuedTo ? `Issued to ${book.issuedTo.email}` : 'Available'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
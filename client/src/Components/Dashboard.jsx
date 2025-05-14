import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard({ user }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8800/api/books/list')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome, {user.role}</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {books.map(book => (
          <div key={book._id} className="bg-gray-50 p-4 rounded-md shadow">
            <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
            <p className="text-gray-600">Author: {book.author}</p>
            {book.issuedTo ? (
              <p className="text-red-600 mt-2">
                Issued to: {book.issuedTo.email}<br />
                Return by: {new Date(book.returnDate).toLocaleDateString()}
              </p>
            ) : (
              <p className="text-green-600 mt-2">Available</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
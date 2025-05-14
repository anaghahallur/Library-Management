import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DeleteBook() {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8800/api/books/list')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/books/delete/${id}`);
      setBooks(prev => prev.filter(book => book._id !== id));
      setMessage('Book deleted successfully!');
    } catch (err) {
      console.error('Delete error:', err);
      setMessage('Error deleting book');
    }
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">🗑️ Delete Book</h1>

      {message && <p className="text-green-600 mb-4">{message}</p>}

      <div className="grid md:grid-cols-2 gap-6">
        {books.map(book => (
          <div key={book._id} className="bg-red-50 p-4 rounded-md shadow">
            <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
            <p className="text-gray-600">Author: {book.author}</p>
            <button
              onClick={() => handleDelete(book._id)}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function DeleteBook() {
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8800/api/books/list')
      .then(res => setBooks(res.data))
      .catch(err => console.error('Fetch error:', err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/books/delete/${id}`);
      setBooks(prev => prev.filter(book => book._id !== id));
      setMessage('Book deleted successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Delete error:', err);
      setMessage('Error deleting book');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-5xl bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          🗑️ Delete Book
        </h2>

        {message && (
          <div className="mb-4 p-3 bg-green-100 border border-green-300 text-green-800 rounded-md">
            {message}
          </div>
        )}

        {books.length === 0 ? (
          <p className="text-gray-600">No books available.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map(book => (
              <div
                key={book._id}
                className="bg-red-50 p-5 rounded-xl shadow hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{book.title}</h3>
                <p className="text-gray-600 mb-4">Author: {book.author}</p>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
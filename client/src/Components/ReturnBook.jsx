import { useState, useEffect } from 'react';
import axios from '../axios.js';

export default function ReturnBook() {
  const [books, setBooks] = useState([]);
  const [bookId, setBookId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get('/books/list')
      .then(res => {
        const issuedBooks = res.data.filter(book => book.issuedTo);
        setBooks(issuedBooks);
      })
      .catch(err => {
        console.error('Error fetching books:', err);
        alert('Failed to load books');
      });
  }, []);

  const handleReturn = async () => {
    if (!bookId) {
      alert('Please select a book to return.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('/books/return', { bookId });
      alert(res.data.message || 'Book returned successfully!');
      setBooks(books.filter(book => book._id !== bookId));
      setBookId('');
    } catch (err) {
      alert(err?.response?.data?.message || 'Return failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          📥 Return Issued Book
        </h2>

        <div className="space-y-6">
          {/* Book Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Issued Book
            </label>
            <select
              value={bookId}
              onChange={e => setBookId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <option value="">-- Select a book --</option>
              {books.map(b => (
                <option key={b._id} value={b._id}>
                  {b.title} — issued to {b.issuedTo.email}
                </option>
              ))}
            </select>
          </div>

          {/* Button */}
          <div className="text-right">
            <button
              onClick={handleReturn}
              disabled={loading || !bookId}
              className={`bg-green-600 text-white px-6 py-2 rounded-xl transition hover:bg-green-700 ${loading || !bookId ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              {loading ? 'Returning...' : 'Return Book'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
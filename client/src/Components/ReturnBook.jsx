import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ReturnBook() {
  const [books, setBooks] = useState([]);
  const [bookId, setBookId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8800/api/books/list')
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
      const res = await axios.post('http://localhost:8800/api/books/return', { bookId });
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
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">📥 Return Issued Book</h2>

      <div className="max-w-md space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Issued Book</label>
          <select
            value={bookId}
            onChange={e => setBookId(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-200"
          >
            <option value="">Select a book to return</option>
            {books.map(b => (
              <option key={b._id} value={b._id}>
                {b.title} — issued to {b.issuedTo.email}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button
            onClick={handleReturn}
            disabled={loading || !bookId}
            className={`bg-green-600 text-white px-4 py-2 rounded-md transition hover:bg-green-700 ${
              loading || !bookId ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Returning...' : 'Return Book'}
          </button>
        </div>
      </div>
    </div>
  );
}
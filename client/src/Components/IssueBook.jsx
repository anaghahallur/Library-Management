import { useState, useEffect } from 'react';
import axios from 'axios';

export default function IssueBook() {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookId, setBookId] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:8800/api/books/list')
      .then(res => setBooks(res.data))
      .catch(err => console.error('Error fetching books:', err));

    axios
      .get('http://localhost:8800/api/users/list') // ensure this backend route exists
      .then(res => setUsers(res.data))
      .catch(err => console.error('Error fetching users:', err));
  }, []);

  const handleIssue = async () => {
    if (!bookId || !userId) {
      alert('Please select both a book and a user.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8800/api/books/issue', {
        bookId,
        userId,
      });
      alert(res.data.message);
      setBookId('');
      setUserId('');
      const updatedBooks = await axios.get('http://localhost:8800/api/books/list');
      setBooks(updatedBooks.data);
    } catch (err) {
      alert(err?.response?.data?.message || 'An error occurred while issuing the book.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          📤 Issue Book
        </h2>

        <div className="space-y-6">
          {/* Book Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Book</label>
            <select
              value={bookId}
              onChange={e => setBookId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">-- Select Book --</option>
              {books.filter(b => !b.issuedTo).map(b => (
                <option key={b._id} value={b._id}>
                  {b.title} by {b.author}
                </option>
              ))}
            </select>
          </div>

          {/* User Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select User</label>
            <select
              value={userId}
              onChange={e => setUserId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">-- Select User --</option>
              {users.map(u => (
                <option key={u._id} value={u._id}>
                  {u.email} ({u.role})
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              onClick={handleIssue}
              disabled={loading || !bookId || !userId}
              className={`bg-blue-600 text-white px-6 py-2 rounded-xl transition hover:bg-blue-700 ${
                loading || !bookId || !userId ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Issuing...' : 'Issue Book'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
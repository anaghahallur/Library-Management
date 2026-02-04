import { useState } from 'react';
import axios from '../axios.js';

export default function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!title.trim() || !author.trim()) {
      alert('Please enter both title and author.');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('/books/add', {
        title,
        author,
      });
      alert(res.data.message || 'Book added successfully!');
      setTitle('');
      setAuthor('');
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to add book.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          ➕ Add New Book
        </h2>

        <div className="space-y-6">
          {/* Book Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
            <input
              type="text"
              placeholder="e.g. The Alchemist"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Author Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
            <input
              type="text"
              placeholder="e.g. Paulo Coelho"
              value={author}
              onChange={e => setAuthor(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Button */}
          <div className="text-right">
            <button
              onClick={handleAdd}
              disabled={loading}
              className={`bg-blue-600 text-white px-6 py-2 rounded-xl transition hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              {loading ? 'Adding...' : 'Add Book'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
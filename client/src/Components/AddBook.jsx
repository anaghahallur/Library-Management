import { useState } from 'react';
import axios from 'axios';

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
      const res = await axios.post('http://localhost:8800/api/books/add', {
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
    <div className="min-h-screen bg-white p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">➕ Add New Book</h2>

      <div className="max-w-md space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
          <input
            type="text"
            placeholder="e.g. The Alchemist"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Author Name</label>
          <input
            type="text"
            placeholder="e.g. Paulo Coelho"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <button
            onClick={handleAdd}
            disabled={loading}
            className={`bg-blue-600 text-white px-4 py-2 rounded-md transition hover:bg-blue-700 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Adding...' : 'Add Book'}
          </button>
        </div>
      </div>
    </div>
  );
}
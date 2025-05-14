import { useState } from 'react';
import axios from 'axios';

export default function AddBook() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleAdd = async () => {
    try {
      const res = await axios.post('http://localhost:8800/api/books/add', { title, author });
      alert(res.data.message);
    } catch (err) {
      alert('Failed to add book');
    }
  };

  return (
    <div className="p-6">
      <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="border p-2 mb-2 block" />
      <input placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} className="border p-2 mb-2 block" />
      <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">Add Book</button>
    </div>
  );
}
import { useEffect, useState } from 'react';
import axios from '../axios.js';
import { Link } from 'react-router-dom';

export default function Dashboard({ user }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get('/books/list')
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-semibold text-red-600">
          Please login to view the dashboard.
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700 mb-4 md:mb-0">
          Welcome, {user.email} {user.role}
        </h1>
        <p className="text-sm text-gray-500">
          Computer Science Department
        </p>
      </div>

      {/* Feature Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <Link to="/books" className="bg-blue-100 p-6 rounded-2xl shadow hover:shadow-md hover:bg-blue-200 transition">
          <h2 className="text-xl font-semibold text-gray-800">📚 View All Books</h2>
          <p className="text-gray-600 mt-1">See all books in the library</p>
        </Link>

        <Link to="/issue" className="bg-green-100 p-6 rounded-2xl shadow hover:shadow-md hover:bg-green-200 transition">
          <h2 className="text-xl font-semibold text-gray-800">
            📤 {user.role === 'student' ? 'Borrow Book' : 'Issue Book'}
          </h2>
          <p className="text-gray-600 mt-1">
            {user.role === 'student'
              ? 'Borrow a book from the library'
              : 'Issue a book to a student'}
          </p>
        </Link>

        {user.role === 'student' && (
          <Link to="/return" className="bg-yellow-100 p-6 rounded-2xl shadow hover:shadow-md hover:bg-yellow-200 transition">
            <h2 className="text-xl font-semibold text-gray-800">📥 Return Book</h2>
            <p className="text-gray-600 mt-1">Return your borrowed book</p>
          </Link>
        )}

        {/* Uncomment this if you add history feature */}
        {/* <Link to="/history" className="bg-purple-100 p-6 rounded-2xl shadow hover:shadow-md hover:bg-purple-200 transition">
          <h2 className="text-xl font-semibold text-gray-800">📖 My Issued Books</h2>
          <p className="text-gray-600 mt-1">View your book history</p>
        </Link> */}

        {user.role === 'teacher' && (
          <>
            <Link to="/addbook" className="bg-pink-100 p-6 rounded-2xl shadow hover:shadow-md hover:bg-pink-200 transition">
              <h2 className="text-xl font-semibold text-gray-800">➕ Add Book</h2>
              <p className="text-gray-600 mt-1">Add new books to the library</p>
            </Link>

            <Link to="/deletebook" className="bg-red-100 p-6 rounded-2xl shadow hover:shadow-md hover:bg-red-200 transition">
              <h2 className="text-xl font-semibold text-gray-800">🗑️ Delete Book</h2>
              <p className="text-gray-600 mt-1">Remove books from the library</p>
            </Link>
          </>
        )}
      </div>

      {/* Book Summary */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📘 Book Summary</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.length === 0 ? (
          <p className="text-gray-600">No books available.</p>
        ) : (
          books.map(book => (
            <div key={book._id} className="bg-gray-50 p-5 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
              <p className="text-gray-600">Author: {book.author}</p>
              {book.issuedTo ? (
                <div className="mt-2 text-red-600 text-sm">
                  Issued to: {book.issuedTo.email}
                  <br />
                  Return by: {new Date(book.returnDate).toLocaleDateString()}
                </div>
              ) : (
                <p className="mt-2 text-green-600 text-sm">Available</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
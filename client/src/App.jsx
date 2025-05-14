// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddBook from './components/AddBook';
import Home from './components/Home';
import BookList from './components/BookList';
import IssueBook from './components/IssueBook';
import ReturnBook from './components/ReturnBook';
import DeleteBook from './components/DeleteBook';

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUser={setUser} />} />

        {user && (
          <>
            <Route path="/dashboard" element={<Dashboard user={user} />} />
            <Route path="/books" element={<BookList />} />
            {user.role === 'student' && (
              <>
                <Route path="/issue" element={<IssueBook />} />
                <Route path="/return" element={<ReturnBook />} />
              </>
            )}
            {user.role === 'teacher' && (
              <>
                <Route path="/issue" element={<IssueBook />} />
                <Route path="/addbook" element={<AddBook />} />
                <Route path="/deletebook" element={<DeleteBook />} />
              </>
            )}
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
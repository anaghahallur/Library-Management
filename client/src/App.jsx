// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './Components/Navbar';
import Signup from './Components/SignUp';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import AddBook from './Components/AddBook';
import Home from './Components/Home';
import BookList from './Components/BookList';
import IssueBook from './Components/IssueBook';
import ReturnBook from './Components/ReturnBook';
import DeleteBook from './Components/DeleteBook';

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
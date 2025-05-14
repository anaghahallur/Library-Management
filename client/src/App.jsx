import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AddBook from './components/AddBook';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
        <Route path="/addbook" element={<AddBook />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
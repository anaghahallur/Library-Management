import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://localhost:8800/api/auth/login', { email, password });
      alert(res.data.message);
      setUser({ id: res.data.userId, role: res.data.role }); // Set user state
      navigate('/dashboard'); // Redirect to dashboard
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-6 bg-gray-100 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border rounded-md"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-md"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
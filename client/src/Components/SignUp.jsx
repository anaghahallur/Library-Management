import { useState } from 'react';
import axios from 'axios';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      const res = await axios.post('http://localhost:8800/api/auth/signup', {
        email,
        role,
        password
      });
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-6 bg-gray-100 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
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
        <select
          className="w-full mb-4 px-4 py-2 border rounded-md"
          value={role}
          onChange={e => setRole(e.target.value)}
        >
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
          onClick={handleSignup}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
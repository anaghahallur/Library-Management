// components/Home.jsx
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Library Management System</h1>
      <div className="space-x-4">
        <button
          className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={() => navigate('/signup')}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
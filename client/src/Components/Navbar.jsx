import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/" className="text-white text-2xl font-semibold">
          📚 Department Library System
        </Link>

        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className="text-white hover:text-yellow-300">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white hover:text-yellow-300">
                Login
              </Link>
              <Link to="/signup" className="text-white hover:text-yellow-300">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="text-2xl font-bold flex items-center gap-2">
            🗂️ DevShelf
          </Link>

          {isAuthenticated && (
            <div className="flex items-center gap-6 text-sm">
              <Link to="/dashboard" className={`hover:text-indigo-200 transition ${isActive('/dashboard') ? 'font-bold' : ''}`}>
                Dashboard
              </Link>
              <Link to="/snippets" className={`hover:text-indigo-200 transition ${isActive('/snippets') ? 'font-bold' : ''}`}>
                Snippets
              </Link>
              <Link to="/resources" className={`hover:text-indigo-200 transition ${isActive('/resources') ? 'font-bold' : ''}`}>
                Resources
              </Link>
              <Link to="/tasks" className={`hover:text-indigo-200 transition ${isActive('/tasks') ? 'font-bold' : ''}`}>
                Tasks
              </Link>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <div className="text-sm flex items-center gap-2">
                👋 {user?.userName || user?.email}
              </div>
              <button
                onClick={handleLogout}
                className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-indigo-200 transition">Login</Link>
              <Link to="/register" className="bg-white text-indigo-600 px-5 py-2 rounded-lg font-medium hover:bg-indigo-50 transition">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


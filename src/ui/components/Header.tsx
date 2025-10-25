import { Link, useNavigate } from 'react-router';
import { useAuthStore } from '../../core/store/authStore';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const token = useAuthStore(state => state.token);
  const clearToken = useAuthStore(state => state.clearToken);

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="container header-content">
        <h1>Country Explorer</h1>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          {!token && <Link to="/login">Login</Link>}
          {!token && <Link to="/register">Register</Link>}
          {token && <button onClick={handleLogout}>Logout</button>}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;

import { Link, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { authService } from '../../infrastructure/auth/AuthService';


function getToken() {
  return document.cookie.split('; ').find(row => row.startsWith('jwt='))?.split('=')[1] || '';
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    setAuthenticated(!!getToken());
    // Listen for cookie changes (simple polling)
    const interval = setInterval(() => {
      setAuthenticated(!!getToken());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    authService.logout();
    setAuthenticated(false);
    navigate('/login');
  };

  return (
    <header style={{padding: '1rem 0', borderBottom: '1px solid var(--border, #eaeaea)'}}>
      <div style={{maxWidth: 1000, margin: '0 auto', padding: '0 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <h1 style={{margin: 0, fontSize: '1.25rem'}}>Country Explorer</h1>
        <nav>
          <Link to="/" style={{marginRight: 12}}>Home</Link>
          {!authenticated && <Link to="/login" style={{marginRight: 12}}>Login</Link>}
          {!authenticated && <Link to="/register">Register</Link>}
          {authenticated && <button onClick={handleLogout} style={{marginLeft: 12, padding: '4px 12px', borderRadius: 4, border: '1px solid #ccc', background: '#eee', cursor: 'pointer'}}>Logout</button>}
        </nav>
      </div>
    </header>
  );
};

export default Header

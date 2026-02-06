import { Link, useNavigate } from 'react-router-dom';
import { logout, isAuthenticated } from '../services/authService';

export default function Navigation() {
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          🌳 ReForest
        </Link>
        <div style={styles.links}>
          <Link to="/" style={styles.link}>Inicio</Link>
          <Link to="/especies" style={styles.link}>Especies</Link>
          <Link to="/donaciones" style={styles.link}>Donaciones</Link>
          
          {isLoggedIn ? (
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Cerrar Sesión
            </button>
          ) : (
            <>
              <Link to="/login" style={styles.link}>Login</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    backgroundColor: '#2d6a4f',
    padding: '1rem 0',
    marginBottom: '2rem',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 2rem',
  },
  logo: {
    color: 'white',
    fontSize: '1.5rem',
    fontWeight: 'bold' as const,
    textDecoration: 'none',
  },
  links: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'opacity 0.3s',
  },
  logoutBtn: {
    backgroundColor: 'transparent',
    color: 'white',
    border: '2px solid white',
    padding: '0.5rem 1.25rem',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: '500' as const,
    transition: 'all 0.3s',
  },
};

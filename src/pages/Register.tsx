import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';

export default function Register() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validación de contraseñas
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      await register({
        nombre,
        email,
        contrasena: password,
        rol: 'usuario', // rol por defecto
      });
      navigate('/'); // Redirigir al home
    } catch (err: unknown) {
      console.error('Error de registro:', err);
      const error = err as { response?: { status: number; data: unknown }; message?: string };
      if (error.response) {
        if (error.response.status === 409) {
          setError('Este email ya esta registrado');
        } else {
          setError(`Error del servidor (${error.response.status}): ${JSON.stringify(error.response.data)}`);
        }
      } else {
        setError(error.message || 'Error de conexion con el servidor');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>📝 Crear Cuenta</h2>
        
        {error && <p style={styles.error}>{error}</p>}
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Nombre completo:</label>
          <input
            type="text"
            placeholder="Tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={styles.input}
            required
            disabled={loading}
            minLength={3}
          />
        </div>
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
            disabled={loading}
          />
        </div>
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Contraseña:</label>
          <input
            type="password"
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
            disabled={loading}
            minLength={6}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Confirmar contraseña:</label>
          <input
            type="password"
            placeholder="Repite la contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={styles.input}
            required
            disabled={loading}
          />
        </div>
        
        <button 
          type="submit" 
          style={loading ? {...styles.button, ...styles.buttonDisabled} : styles.button}
          disabled={loading}
        >
          {loading ? 'Registrando...' : 'Crear Cuenta'}
        </button>

        <p style={styles.loginLink}>
          ¿Ya tienes cuenta? <Link to="/login" style={styles.link}>Inicia sesión aquí</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(100vh - 200px)',
    padding: '2rem',
  },
  form: {
    backgroundColor: '#f8f9fa',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '420px',
  },
  title: {
    color: '#2d6a4f',
    textAlign: 'center' as const,
    marginBottom: '1.5rem',
  },
  inputGroup: {
    marginBottom: '1.5rem',
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    color: '#333',
    fontWeight: '500' as const,
  },
  input: {
    width: '100%',
    padding: '0.875rem',
    border: '2px solid #ddd',
    borderRadius: '6px',
    fontSize: '1rem',
    transition: 'border-color 0.3s',
  },
  button: {
    width: '100%',
    padding: '0.875rem',
    marginTop: '1rem',
    backgroundColor: '#2d6a4f',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: '600' as const,
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonDisabled: {
    backgroundColor: '#95a5a6',
    cursor: 'not-allowed',
  },
  error: {
    color: '#dc3545',
    backgroundColor: '#f8d7da',
    padding: '0.75rem',
    borderRadius: '6px',
    marginBottom: '1rem',
    textAlign: 'center' as const,
    fontSize: '0.9rem',
  },
  loginLink: {
    marginTop: '1.5rem',
    textAlign: 'center' as const,
    color: '#666',
  },
  link: {
    color: '#2d6a4f',
    fontWeight: '600' as const,
    textDecoration: 'none',
  },
};

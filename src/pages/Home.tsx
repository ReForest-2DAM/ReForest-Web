import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{
      padding: '3rem',
      maxWidth: '1200px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <h1 style={{
        color: '#2d6a4f',
        fontSize: '3rem',
        marginBottom: '1rem'
      }}>
        🌳 Bienvenido a ReForest
      </h1>

      <p style={{
        fontSize: '1.3rem',
        color: '#555',
        marginBottom: '2rem'
      }}>
        Planta árboles y contribuye a un futuro más verde
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        marginTop: '3rem'
      }}>
        {/* Tarjeta Especies */}
        <div
          style={{
            padding: '2rem',
            backgroundColor: '#f0f8f5',
            borderRadius: '12px',
            border: '2px solid #2d6a4f',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
          onClick={() => navigate('/especies')}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(45,106,79,0.3)';
            e.currentTarget.style.backgroundColor = '#e8f5e9';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            e.currentTarget.style.backgroundColor = '#f0f8f5';
          }}
        >
          <h2 style={{ color: '#2d6a4f', marginBottom: '1rem' }}>🌲 Especies</h2>
          <p style={{ color: '#555' }}>
            Explora nuestro catálogo de árboles disponibles para plantar
          </p>
        </div>

        {/* Tarjeta Donaciones */}
        <div
          style={{
            padding: '2rem',
            backgroundColor: '#f0f8f5',
            borderRadius: '12px',
            border: '2px solid #2d6a4f',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
          onClick={() => navigate('/donaciones')}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-8px)';
            e.currentTarget.style.boxShadow = '0 8px 20px rgba(45,106,79,0.3)';
            e.currentTarget.style.backgroundColor = '#e8f5e9';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
            e.currentTarget.style.backgroundColor = '#f0f8f5';
          }}
        >
          <h2 style={{ color: '#2d6a4f', marginBottom: '1rem' }}>💚 Donaciones</h2>
          <p style={{ color: '#555' }}>
            Realiza tu donación y ayuda a reforestar el planeta
          </p>
        </div>
      </div>
    </div>
  );
}

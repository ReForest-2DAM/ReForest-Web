import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllEspecies } from '../services';
import type { Especie } from '../types/especie';

export default function EspeciesList() {
  const [especies, setEspecies] = useState<Especie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEspecies = async () => {
      try {
        console.log('🔍 Llamando a getAllEspecies...');
        const data = await getAllEspecies();
        console.log('✅ Especies recibidas:', data);
        setEspecies(data);
      } catch (err) {
        console.error('❌ Error al cargar especies:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar las especies');
      } finally {
        setLoading(false);
      }
    };

    fetchEspecies();
  }, []);

  if (loading) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '50px',
        fontSize: '20px',
        color: '#2d6a4f'
      }}>
        🌱 Cargando especies...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '50px', 
        color: '#d00',
        fontSize: '18px'
      }}>
        ❌ Error: {error}
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      <h1 style={{ color: '#2d6a4f', marginBottom: '10px' }}>
        🌲 Lista de Especies
      </h1>
      <p style={{ marginBottom: '2rem', color: '#555', fontSize: '16px' }}>
        {especies.length} especies disponibles para plantar
      </p>

      {especies.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#999' }}>
          No hay especies disponibles
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '25px'
        }}>
          {especies.map((especie) => (
            <div 
              key={especie.id}
              style={{
                border: '2px solid #2d6a4f',
                borderRadius: '12px',
                padding: '0',
                backgroundColor: '#fff',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 20px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
              }}
            >
              {/* Imagen */}
              <img 
                src={especie.image_url} 
                alt={especie.nombre_comun}
                style={{
                  width: '100%',
                  height: '220px',
                  objectFit: 'cover'
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 
                    'https://via.placeholder.com/320x220/2d6a4f/ffffff?text=Sin+Imagen';
                }}
              />

              {/* Contenido */}
              <div style={{ padding: '20px' }}>
                {/* Título y disponibilidad */}
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px'
                }}>
                  <h3 style={{ 
                    color: '#2d6a4f', 
                    margin: 0,
                    fontSize: '22px',
                    fontWeight: 'bold'
                  }}>
                    {especie.nombre_comun}
                  </h3>
                  
                  {especie.disponible ? (
                    <span style={{
                      backgroundColor: '#d4edda',
                      color: '#155724',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      ✓ Disponible
                    </span>
                  ) : (
                    <span style={{
                      backgroundColor: '#f8d7da',
                      color: '#721c24',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}>
                      ✗ Agotado
                    </span>
                  )}
                </div>

                {/* Descripción */}
                <p style={{ 
                  color: '#555', 
                  fontSize: '14px',
                  lineHeight: '1.5',
                  marginBottom: '15px',
                  minHeight: '60px'
                }}>
                  {especie.descripcion}
                </p>

                {/* Datos técnicos */}
                <div style={{ 
                  borderTop: '1px solid #e0e0e0',
                  paddingTop: '15px',
                  fontSize: '14px'
                }}>
                  <div style={{ 
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '10px'
                  }}>
                    <div>
                      <strong>💰 Precio:</strong><br/>
                      <span style={{ color: '#2d6a4f', fontSize: '18px', fontWeight: 'bold' }}>
                        {especie.precio_plantacion}€
                      </span>
                    </div>
                    
                    <div>
                      <strong>🌱 CO₂/año:</strong><br/>
                      <span style={{ color: '#2d6a4f', fontWeight: 'bold' }}>
                        {especie.co2_anual_kg} kg
                      </span>
                    </div>
                  </div>

                  <div style={{ marginTop: '10px' }}>
                    <p style={{ margin: '5px 0' }}>
                      <strong>📍 Zona:</strong> {especie.zona_geografica}
                    </p>
                    <p style={{ margin: '5px 0' }}>
                      <strong>📏 Altura máx.:</strong> {especie.altura_maxima_m}m
                    </p>
                  </div>
                </div>

                {/* Botón */}
                {especie.disponible && (
                  <button
                    style={{
                      width: '100%',
                      marginTop: '15px',
                      padding: '12px',
                      backgroundColor: '#2d6a4f',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '16px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#1f4d37';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#2d6a4f';
                    }}
                    onClick={() => navigate('/donaciones')}
                  >
                    🌳 Plantar ahora
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

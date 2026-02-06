import { useEffect, useState } from 'react';
import { getAllDonaciones } from '../services';
import type { Donacion } from '../types';

export default function DonacionesList() {
  const [donaciones, setDonaciones] = useState<Donacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDonaciones = async () => {
      try {
        console.log('🔍 Llamando a getAllDonaciones...');
        const data = await getAllDonaciones();
        console.log('✅ Donaciones recibidas:', data);
        setDonaciones(data);
      } catch (err) {
        console.error('❌ Error al cargar donaciones:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar las donaciones');
      } finally {
        setLoading(false);
      }
    };

    fetchDonaciones();
  }, []);

  if (loading) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '50px',
        fontSize: '20px',
        color: '#2d6a4f'
      }}>
        💰 Cargando donaciones...
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
        💰 Lista de Donaciones
      </h1>
      <p style={{ marginBottom: '2rem', color: '#555', fontSize: '16px' }}>
        {donaciones.length} donaciones realizadas
      </p>

      {donaciones.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          border: '2px dashed #2d6a4f'
        }}>
          <p style={{ fontSize: '1.2rem', color: '#2d6a4f', marginBottom: '1rem' }}>
            🌱 Aún no hay donaciones registradas
          </p>
          <p style={{ color: '#666' }}>
            Las donaciones aparecerán aquí cuando se realicen plantaciones
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gap: '20px'
        }}>
          {donaciones.map((donacion) => (
            <div
              key={donacion.id}
              style={{
                border: '2px solid #2d6a4f',
                borderRadius: '12px',
                padding: '1.5rem',
                backgroundColor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                alignItems: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
            >
              {/* Info del donante */}
              <div>
                <p style={{
                  fontSize: '12px',
                  color: '#999',
                  marginBottom: '5px',
                  textTransform: 'uppercase',
                  fontWeight: '600'
                }}>
                  Donante
                </p>
                <p style={{
                  fontSize: '18px',
                  color: '#2d6a4f',
                  fontWeight: 'bold',
                  margin: 0
                }}>
                  {donacion.nombre_donante}
                </p>
              </div>

              {/* Fecha */}
              <div>
                <p style={{
                  fontSize: '12px',
                  color: '#999',
                  marginBottom: '5px',
                  textTransform: 'uppercase',
                  fontWeight: '600'
                }}>
                  Fecha
                </p>
                <p style={{
                  fontSize: '16px',
                  color: '#333',
                  margin: 0
                }}>
                  📅 {new Date(donacion.fecha).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              {/* Cantidad de árboles */}
              <div>
                <p style={{
                  fontSize: '12px',
                  color: '#999',
                  marginBottom: '5px',
                  textTransform: 'uppercase',
                  fontWeight: '600'
                }}>
                  Árboles
                </p>
                <p style={{
                  fontSize: '22px',
                  color: '#2d6a4f',
                  fontWeight: 'bold',
                  margin: 0
                }}>
                  🌳 {donacion.cantidad_arboles}
                </p>
              </div>

              {/* Total donado */}
              <div>
                <p style={{
                  fontSize: '12px',
                  color: '#999',
                  marginBottom: '5px',
                  textTransform: 'uppercase',
                  fontWeight: '600'
                }}>
                  Total
                </p>
                <p style={{
                  fontSize: '22px',
                  color: '#2d6a4f',
                  fontWeight: 'bold',
                  margin: 0
                }}>
                  💵 {donacion.total_donado.toFixed(2)}€
                </p>
              </div>

              {/* Estado y pagado */}
              <div>
                <p style={{
                  fontSize: '12px',
                  color: '#999',
                  marginBottom: '5px',
                  textTransform: 'uppercase',
                  fontWeight: '600'
                }}>
                  Estado
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{
                    backgroundColor: donacion.estado === 'completada' ? '#d4edda' : '#fff3cd',
                    color: donacion.estado === 'completada' ? '#155724' : '#856404',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    textTransform: 'capitalize'
                  }}>
                    {donacion.estado}
                  </span>

                  {donacion.pagado ? (
                    <span style={{
                      backgroundColor: '#d4edda',
                      color: '#155724',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 'bold'
                    }}>
                      ✓ Pagado
                    </span>
                  ) : (
                    <span style={{
                      backgroundColor: '#f8d7da',
                      color: '#721c24',
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: 'bold'
                    }}>
                      ⏳ Pendiente
                    </span>
                  )}
                </div>
              </div>

              {/* IDs (para referencia) */}
              <div style={{
                gridColumn: '1 / -1',
                paddingTop: '0.5rem',
                borderTop: '1px solid #e0e0e0',
                fontSize: '12px',
                color: '#999',
                display: 'flex',
                gap: '1rem'
              }}>
                <span>ID Donación: #{donacion.id}</span>
                <span>ID Especie: #{donacion.id_especie}</span>
                <span>ID Usuario: #{donacion.id_usuario}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Estadísticas totales */}
      {donaciones.length > 0 && (
        <div style={{
          marginTop: '3rem',
          padding: '2rem',
          backgroundColor: '#f0f8f5',
          borderRadius: '12px',
          border: '2px solid #2d6a4f'
        }}>
          <h2 style={{ color: '#2d6a4f', marginBottom: '1.5rem', textAlign: 'center' }}>
            📊 Estadísticas Totales
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem',
            textAlign: 'center'
          }}>
            <div>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d6a4f', margin: '0 0 0.5rem 0' }}>
                {donaciones.reduce((sum, d) => sum + d.cantidad_arboles, 0)}
              </p>
              <p style={{ color: '#555', fontSize: '1rem' }}>🌳 Árboles Totales</p>
            </div>

            <div>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d6a4f', margin: '0 0 0.5rem 0' }}>
                {donaciones.reduce((sum, d) => sum + d.total_donado, 0).toFixed(2)}€
              </p>
              <p style={{ color: '#555', fontSize: '1rem' }}>💰 Total Recaudado</p>
            </div>

            <div>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d6a4f', margin: '0 0 0.5rem 0' }}>
                {donaciones.filter(d => d.pagado).length}
              </p>
              <p style={{ color: '#555', fontSize: '1rem' }}>✓ Pagadas</p>
            </div>

            <div>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2d6a4f', margin: '0 0 0.5rem 0' }}>
                {donaciones.filter(d => d.estado === 'completada').length}
              </p>
              <p style={{ color: '#555', fontSize: '1rem' }}>🎉 Completadas</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

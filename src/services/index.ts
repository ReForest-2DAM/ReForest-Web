// Exportar todas las funciones de especies
export {
  getAllEspecies,
  getEspecieById,
  createEspecie,
  updateEspecie,
  deleteEspecie,
  getEspeciesDisponibles,
} from './especieService';

// Exportar todas las funciones de donaciones
export {
  getAllDonaciones,
  getDonacionById,
  createDonacion,
  updateDonacion,
  deleteDonacion,
  getDonacionesByUsuario,
  getDonacionesByEspecie,
} from './donacionService';

// Exportar el cliente API por si se necesita directamente
export { default as api } from './apiClient';

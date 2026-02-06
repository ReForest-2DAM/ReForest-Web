export interface Donacion {
  id: number;
  fecha: string;
  nombre_donante: string;
  cantidad_arboles: number;
  total_donado: number;
  estado: string;
  pagado: boolean;
  id_especie: number;
  id_usuario: number;
}

export interface DonacionFormData {
  fecha: string;
  nombre_donante: string;
  cantidad_arboles: number;
  total_donado: number;
  estado: string;
  pagado: boolean;
  id_especie: number;
  id_usuario: number;
}

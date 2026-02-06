import { Especie } from './especie';
import { Usuario } from './usuario';

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
  especie?: Especie;
  usuario?: Usuario;
}

export interface DonacionFormData {
  nombre_donante: string;
  cantidad_arboles: number;
  id_especie: number;
  id_usuario: number;
}

export type EstadoDonacion = 'confirmada' | 'pendiente' | 'cancelada';

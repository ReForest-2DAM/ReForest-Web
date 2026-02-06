import api from './apiClient';
import type { Usuario, LoginData, UsuarioFormData } from '../types';

interface AuthResponse {
  token: string;
  usuario: Usuario;
}

// Login de usuario
export const login = async (credentials: LoginData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', credentials);
  localStorage.setItem('token', response.data.token);
  return response.data;
};

// Registro de nuevo usuario
export const register = async (userData: UsuarioFormData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', userData);
  localStorage.setItem('token', response.data.token);
  return response.data;
};

// Cerrar sesión
export const logout = (): void => {
  localStorage.removeItem('token');
};

// Obtener usuario actual
export const getCurrentUser = async (): Promise<Usuario> => {
  const response = await api.get<Usuario>('/auth/me');
  return response.data;
};

// Verificar si hay token
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};

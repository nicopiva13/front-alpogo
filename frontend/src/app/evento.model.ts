export interface Evento {
  id_evento: number;
  nombre: string;
  descripcion: string;
  descripcion_corta: string;
  estado: string;
  visible: boolean;
  gratuito: boolean;
  actividad: string;
  id_lugar: number;
  lugar: string;
  id_provincia: number;
  provincia: string;
  inicio_funcion: string;
  fin_funcion: string;
  restriccion: string;
  imagen_logo: string;
  menor_precio: number;
}

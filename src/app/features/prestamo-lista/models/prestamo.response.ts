export interface IPrestamoResponse {
  idPrestamo: number;
  idLibro: number;
  idEstado: number;
  tituloLibro: string,
  estado: string;
  fechaPrestamo: Date;
  fechaDevolucion?: Date;
  fechaCreacion: Date;
  fechaActualizacion?: Date;
  }
  
export interface ILibroResponse {
    idLibro: number;
    titulo: string;
    idAutor: number;
    isbn: string;
    fechaPublicacion: Date;
    idEstado: number;
    fechaRegistro: Date;
    fechaActualizacion?: Date;
  }
  
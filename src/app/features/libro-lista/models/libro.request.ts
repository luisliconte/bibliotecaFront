export interface ILibroRequest {
    idLibro: number;
    titulo: string;
    idAutor: number;
    isbn: string;
    fechaPublicacion: Date;
    idEstado: number;
    idEliminar?: number;
  }
  
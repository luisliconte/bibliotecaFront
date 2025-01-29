import { Component, inject, OnInit } from '@angular/core';
import { ILibroResponse } from '../../models/libro.response';
import { LibroListaComponent } from '../presentation/libro-lista.component';
import { LibroServicesService } from '../../services/libro.services.service';
import { MatTableDataSource } from '@angular/material/table';
import { LibroRegistroContainerComponent } from '../../../libros-registro/components/containers/libro-registro-container.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { IAccion } from '../../../../shared/models/accion';

@Component({
  selector: 'app-libro-lista-container',
  standalone: true,
  imports: [LibroListaComponent],
  templateUrl: './libro-lista-container.component.html',

})
export class LibroListaContainerComponent implements OnInit {
  private _libroServicesService = inject(LibroServicesService);
  public dataSource: MatTableDataSource<ILibroResponse> = new MatTableDataSource<ILibroResponse>();
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getLibro();
  }

  getLibro() {
    this._libroServicesService.getLibro().subscribe(res => {
      this.dataSource.data = res;
    });
  }

  openDialog(libroAccion: IAccion | null): void {
    if (!libroAccion) {
      return;
    }
  
    switch (libroAccion.accion) {
      case 'editar':
        this.modalLibro(libroAccion);
        break;
      case 'eliminar':
        this.deleteLibro(libroAccion);
        break;
      default:
        this.modalLibro({} as IAccion);
        break;
    }
  }

  modalLibro(libroAccion: IAccion) {
    let libro: ILibroResponse | undefined = {} as ILibroResponse;
    if (libroAccion.id != null) {
      libro = this.dataSource.data.find(res => res.idLibro === libroAccion.id);
    }
    const dialogRef = this.dialog.open(LibroRegistroContainerComponent, {
      minWidth: '80%',
      maxWidth: '100%',
      height: 'auto',
      data: libro
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.getLibro();
      }
    });
  }
  
//TODO: Las alertas deben configurarse para que sean dinámicas.
  deleteLibro(libroAccion: IAccion) {
    Swal.fire({
      title: 'Confirmación',
      text: '¿Deseas borrar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._libroServicesService.deleteLibro(libroAccion.id).subscribe(res => {
          Swal.fire("Exitoso", "El registro ha sido eliminado exitosamente", 'success');
          this.getLibro();
        });
      } else if (result.isDismissed) {
        Swal.fire('Cancelado', 'El registro no ha sido eliminado.', 'info');
      }
    });
  }
  
}

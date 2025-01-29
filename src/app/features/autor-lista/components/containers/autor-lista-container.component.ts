import { Component, inject, OnInit } from '@angular/core';
import { IAutorResponse } from '../../models/autor.response';
import { AutorListaComponent } from '../presentation/autor-lista.component';
import { AutorServicesService } from '../../services/autor.services.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { IAccion } from '../../../../shared/models/accion';
import { AutorRegistroContainerComponent } from '../../../autor-registro/components/containers/autor-registro-container.component';

@Component({
  selector: 'app-autor-lista-container',
  standalone: true,
  imports: [AutorListaComponent],
  templateUrl: './autor-lista-container.component.html',

})
export class AutorListaContainerComponent implements OnInit {
  private _autorServicesService = inject(AutorServicesService);
  public dataSource: MatTableDataSource<IAutorResponse> = new MatTableDataSource<IAutorResponse>();
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getAutor();
  }

  getAutor() {
    this._autorServicesService.getAutor().subscribe(res => {
      this.dataSource.data = res;
    });
  }

  openDialog(autorAccion: IAccion | null): void {
    if (!autorAccion) {
      return;
    }

    switch (autorAccion.accion) {
      case 'editar':
        this.modalAutor(autorAccion);
        break;
      case 'eliminar':
        this.deleteAutor(autorAccion);
        break;
      default:
        this.modalAutor({} as IAccion);
        break;
    }
  }

  modalAutor(autorAccion: IAccion) {
    let autor: IAutorResponse | undefined = {} as IAutorResponse;
    if (autorAccion.id != null) {
      autor = this.dataSource.data.find(res => res.idAutor === autorAccion.id);
    }
    const dialogRef = this.dialog.open(AutorRegistroContainerComponent, {
      minWidth: '80%',
      maxWidth: '100%',
      height: 'auto',
      data: autor
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.getAutor();
      }
    });
  }
  
//TODO: Las alertas deben configurarse de manera que sean dinámicas.
  deleteAutor(autorAccion: IAccion) {
    Swal.fire({
      title: 'Confirmación',
      text: '¿Deseas borrar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._autorServicesService.deleteAutor(autorAccion.id).subscribe(res => {
          Swal.fire("Exitoso", "El registro ha sido eliminado exitosamente", 'success');
          this.getAutor();
        });
      } else if (result.isDismissed) {
        Swal.fire('Cancelado', 'El registro no ha sido eliminado.', 'info');
      }
    });
  }
  
}

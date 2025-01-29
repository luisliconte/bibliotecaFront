import { Component, inject, OnInit } from '@angular/core';
import { IPrestamoResponse } from '../../models/prestamo.response';
import { PrestamoListaComponent } from '../presentation/prestamo-lista.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { IAccion } from '../../../../shared/models/accion';
import { PrestamoService } from '../../services/prestamo.service';
import { PrestamoRegistroContainerComponent } from '../../../prestamo-registro/components/containers/prestamo-registro-container.component';

@Component({
  selector: 'app-prestamo-lista-container',
  standalone: true,
  imports: [PrestamoListaComponent],
  templateUrl: './prestamo-lista-container.component.html',

})
export class PrestamoListaContainerComponent implements OnInit {
  private _prestamoServicesService = inject(PrestamoService);
  public dataSource: MatTableDataSource<IPrestamoResponse> = new MatTableDataSource<IPrestamoResponse>();
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.getPrestamo();
  }

  getPrestamo() {
    this._prestamoServicesService.getPrestamo().subscribe(res => {
      this.dataSource.data = res;
    });
  }

  openDialog(prestamoAccion: IAccion | null): void {
    if (!prestamoAccion) {
      return;
    }
  
    switch (prestamoAccion.accion) {
      case 'editar':
        this.modalPrestamo(prestamoAccion);
        break;
      case 'eliminar':
        this.deletePrestamo(prestamoAccion);
        break;
      default:
        this.modalPrestamo({} as IAccion);
        break;
    }
  }

  modalPrestamo(prestamoAccion: IAccion) {
    let prestamo: IPrestamoResponse | undefined = {} as IPrestamoResponse;
    if (prestamoAccion.id != null) {
      prestamo = this.dataSource.data.find(res => res.idPrestamo === prestamoAccion.id);
    }
    const dialogRef = this.dialog.open(PrestamoRegistroContainerComponent, {
      minWidth: '80%',
      maxWidth: '100%',
      height: 'auto',
      data: prestamo
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.getPrestamo();
      }
    });
  }
  
//TODO: Las alertas deben configurarse para que sean dinámicas.
  deletePrestamo(prestamoAccion: IAccion) {
    Swal.fire({
      title: 'Confirmación',
      text: '¿Deseas borrar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this._prestamoServicesService.deletePrestamo(prestamoAccion.id).subscribe(res => {
          Swal.fire("Exitoso", "El registro ha sido eliminado exitosamente", 'success');
          this.getPrestamo();
        });
      } else if (result.isDismissed) {
        Swal.fire('Cancelado', 'El registro no ha sido eliminado.', 'info');
      }
    });
  }
  
}

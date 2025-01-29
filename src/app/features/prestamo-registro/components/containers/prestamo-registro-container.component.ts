import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IPrestamoResponse } from '../../models/prestamo.response';
import { PrestamoRegistroComponent } from '../presentation/prestamo-registro.component';
import { PrestamoService } from '../../../prestamo-lista/services/prestamo.service';
import { IPrestamoRequest } from '../../../prestamo-lista/models/prestamo.request';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPrestamoComunicaion } from '../../models/prestamo-comunicacion';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-prestamo-container',
  standalone: true,
  imports: [PrestamoRegistroComponent, SweetAlert2Module ],
  templateUrl: './prestamo-registro-container.component.html',

})
export class PrestamoRegistroContainerComponent implements OnInit {
  private _prestamoServicesService = inject(PrestamoService);
  prestamoForm: FormGroup;
  prestamoComunicaion: IPrestamoComunicaion = {} as IPrestamoComunicaion;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<PrestamoRegistroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPrestamoResponse
  ) {
    this.prestamoForm = this.fb.group({
      idLibro: [null, Validators.required],
      idEstado: [null, Validators.required],
      fechaPrestamo: ['', [Validators.required]],
      fechaDevolucion: ['', Validators.required],
    });

  }

  ngOnInit(): void {
    this.editarPrestamo(this.data);
    this.prestamoComunicaion.id = this.data.idPrestamo;
    this.prestamoComunicaion.prestamoForm = this.prestamoForm;
  }

  onSubmit(prestamo: IPrestamoRequest): void {
    prestamo.idPrestamo != null ? this.putPrestamo(prestamo) : this.postPrestamo(prestamo);
  }

  postPrestamo(prestamo: IPrestamoRequest) {
    this._prestamoServicesService.postPrestamo(prestamo).subscribe(res => {
      Swal.fire("Exitoso", "El registro ha sido registrado exitosamente", 'success');
      this.dialogRef.close(res);
    });
  }

  putPrestamo(prestamo: IPrestamoRequest) {
    this._prestamoServicesService.putPrestamo(prestamo).subscribe(res => {
      Swal.fire("Exitoso", "El registro ha sido actualizado exitosamente", 'success');
      this.dialogRef.close(res);
    });
  }

  editarPrestamo(prestamo: IPrestamoResponse) {
    this.prestamoForm.patchValue(prestamo);
  }
}

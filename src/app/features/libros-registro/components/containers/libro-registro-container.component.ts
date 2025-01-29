import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ILibroResponse } from '../../models/libro.response';
import { LibroRegistroComponent } from '../presentation/libro-registro.component';
import { LibroServicesService } from '../../../libro-lista/services/libro.services.service';
import { ILibroRequest } from '../../../libro-lista/models/libro.request';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ILibroComunicaion } from '../../models/libro-comunicacion';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-libro-container',
  standalone: true,
  imports: [LibroRegistroComponent, SweetAlert2Module ],
  templateUrl: './libro-registro-container.component.html',

})
export class LibroRegistroContainerComponent implements OnInit {
  private _libroServicesService = inject(LibroServicesService);
  libroForm: FormGroup;
  libroComunicaion: ILibroComunicaion = {} as ILibroComunicaion;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<LibroRegistroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ILibroResponse
  ) {
    this.libroForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.maxLength(100)]],
      idAutor: [null, Validators.required],
      isbn: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
      fechaPublicacion: ['', Validators.required],
      idEstado: [null, Validators.required],
    });

  }

  ngOnInit(): void {
    this.editarLibro(this.data);
    this.libroComunicaion.id = this.data.idLibro;
    this.libroComunicaion.libroForm = this.libroForm;
  }

  onSubmit(libro: ILibroRequest): void {
    libro.idLibro != null ? this.putLibro(libro) : this.postLibro(libro);
  }

  postLibro(libro: ILibroRequest) {
    this._libroServicesService.postLibro(libro).subscribe(res => {
      Swal.fire("Exitoso", "El registro ha sido registrado exitosamente", 'success');
      this.dialogRef.close(res);
    });
  }

  putLibro(libro: ILibroRequest) {
    this._libroServicesService.putLibro(libro).subscribe(res => {
      Swal.fire("Exitoso", "El registro ha sido actualizado exitosamente", 'success');
      this.dialogRef.close(res);
    });
  }

  editarLibro(libro: ILibroResponse) {
    this.libroForm.patchValue(libro);
  }
}

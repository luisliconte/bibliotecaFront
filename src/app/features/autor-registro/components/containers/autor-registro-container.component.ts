import { Component, Inject, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAutorResponse } from '../../models/autor.response';
import { AutorRegistroComponent } from '../presentation/autor-registro.component';
import { AutorServicesService } from '../../../autor-lista/services/autor.services.service';
import { IAutorRequest } from '../../../autor-lista/models/autor.request';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IAutorComunicaion } from '../../models/autor-comunicacion';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-autor-container',
  standalone: true,
  imports: [AutorRegistroComponent, SweetAlert2Module ],
  templateUrl: './autor-registro-container.component.html',

})
export class AutorRegistroContainerComponent implements OnInit {
  private _autorServicesService = inject(AutorServicesService);
  autorForm: FormGroup;
  autorComunicaion: IAutorComunicaion = {} as IAutorComunicaion;

  constructor(private fb: FormBuilder,
    private dialogRef: MatDialogRef<AutorRegistroComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAutorResponse
  ) {
    this.autorForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      nacionalidad: [null, Validators.required],
      fechaNacimiento: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.editarAutor(this.data);
    this.autorComunicaion.id = this.data.idAutor;
    this.autorComunicaion.autorForm = this.autorForm;
  }

  onSubmit(autor: IAutorRequest): void {
    autor.idAutor != null ? this.putAutor(autor) : this.postAutor(autor);
  }

  postAutor(autor: IAutorRequest) {
    this._autorServicesService.postAutor(autor).subscribe(res => {
      Swal.fire("Exitoso", "El registro ha sido registrado exitosamente", 'success');
      this.dialogRef.close(res);
    });
  }

  putAutor(autor: IAutorRequest) {
    this._autorServicesService.putAutor(autor).subscribe(res => {
      Swal.fire("Exitoso", "El registro ha sido actualizado exitosamente", 'success');
      this.dialogRef.close(res);
    });
  }

  editarAutor(autor: IAutorResponse) {
    this.autorForm.patchValue(autor);
  }
}

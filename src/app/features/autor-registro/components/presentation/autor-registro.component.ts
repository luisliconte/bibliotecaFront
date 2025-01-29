import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { IAutorRequest } from '../../../autor-lista/models/autor.request';
import { IAutorComunicaion } from '../../models/autor-comunicacion';

@Component({
  selector: 'app-autor-registro',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './autor-registro.component.html',
  styleUrl: './autor-registro.component.css'
})
export class AutorRegistroComponent {
  @Input() autorComunicaion: IAutorComunicaion = {} as IAutorComunicaion;
  @Output() submitForm = new EventEmitter<IAutorRequest>();

  onSubmit(): void {
    if (this.autorComunicaion.autorForm.valid) {
      this.submitForm.emit(this.toRequest());
    }
  }

  toRequest(): IAutorRequest {
    return {
      idAutor: this.autorComunicaion.id,
      nombre: this.autorComunicaion.autorForm.controls['nombre'].value,
      nacionalidad: this.autorComunicaion.autorForm.controls['nacionalidad'].value,
      fechaNacimiento: this.autorComunicaion.autorForm.controls['fechaNacimiento'].value,

    };
  }
}

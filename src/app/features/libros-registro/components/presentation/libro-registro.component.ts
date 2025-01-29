import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { ILibroRequest } from '../../../libro-lista/models/libro.request';
import { ILibroComunicaion } from '../../models/libro-comunicacion';

@Component({
  selector: 'app-libro-registro',
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
  templateUrl: './libro-registro.component.html',
  styleUrl: './libro-registro.component.css'
})
export class LibroRegistroComponent {
  @Input() libroComunicaion: ILibroComunicaion = {} as ILibroComunicaion;
  @Output() submitForm = new EventEmitter<ILibroRequest>();

  onSubmit(): void {
    if (this.libroComunicaion.libroForm.valid) {
      this.submitForm.emit(this.toRequest());
    }
  }

  toRequest(): ILibroRequest {
    return {
      idLibro: this.libroComunicaion.id,
      titulo: this.libroComunicaion.libroForm.controls['titulo'].value,
      idAutor: this.libroComunicaion.libroForm.controls['idAutor'].value,
      isbn: this.libroComunicaion.libroForm.controls['isbn'].value,
      fechaPublicacion: this.libroComunicaion.libroForm.controls['fechaPublicacion'].value,
      idEstado: this.libroComunicaion.libroForm.controls['idEstado'].value,
    };
  }
}

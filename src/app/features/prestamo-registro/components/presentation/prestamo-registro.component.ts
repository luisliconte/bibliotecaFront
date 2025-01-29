import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { IPrestamoRequest } from '../../../prestamo-lista/models/prestamo.request';
import { IPrestamoComunicaion } from '../../models/prestamo-comunicacion';

@Component({
  selector: 'app-prestamo-registro',
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
  templateUrl: './prestamo-registro.component.html',
  styleUrl: './prestamo-registro.component.css'
})
export class PrestamoRegistroComponent {
  @Input() prestamoComunicaion: IPrestamoComunicaion = {} as IPrestamoComunicaion;
  @Output() submitForm = new EventEmitter<IPrestamoRequest>();

  onSubmit(): void {
    if (this.prestamoComunicaion.prestamoForm.valid) {
      this.submitForm.emit(this.toRequest());
    }
  }

  toRequest(): IPrestamoRequest {
    return {
      idPrestamo: this.prestamoComunicaion.id,
      idLibro: this.prestamoComunicaion.prestamoForm.controls['idLibro'].value,
      fechaPrestamo: this.prestamoComunicaion.prestamoForm.controls['fechaPrestamo'].value,
      fechaDevolucion: this.prestamoComunicaion.prestamoForm.controls['fechaDevolucion'].value,
      idEstado: this.prestamoComunicaion.prestamoForm.controls['idEstado'].value,
    };
  }
}

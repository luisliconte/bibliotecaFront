import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IPrestamoResponse } from '../../models/prestamo.response';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { IAccion } from '../../../../shared/models/accion';
import { COLUMNS_TABLE_PRESTAMO } from '../../../../shared/config-tables/columns-table-prestamo';

@Component({
  selector: 'app-prestamo-lista',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    SweetAlert2Module,
    CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './prestamo-lista.component.html',
  styleUrl: './prestamo-lista.component.css'
})
export class PrestamoListaComponent implements AfterViewInit {
  @Input() prestamoData: MatTableDataSource<IPrestamoResponse> = new MatTableDataSource<IPrestamoResponse>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = COLUMNS_TABLE_PRESTAMO;

  @Output() addPrestamo = new EventEmitter<IAccion | null>();
  prestamoAccion: IAccion = {} as IAccion;

  ngAfterViewInit() {
    this.prestamoData.paginator = this.paginator;
    this.prestamoData.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.prestamoData.filter = filterValue.trim().toLowerCase();

    if (this.prestamoData.paginator) {
      this.prestamoData.paginator.firstPage();
    }
  }

  accion(idRow: number, accion: string): void {
    this.prestamoAccion.id = idRow;
    this.prestamoAccion.accion = accion;
    this.addPrestamo.emit(this.prestamoAccion);
  }
}

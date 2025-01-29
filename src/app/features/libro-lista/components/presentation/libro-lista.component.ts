import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ILibroResponse } from '../../models/libro.response';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { COLUMNS_TABLE_LIBRO } from '../../../../shared/config-tables/columns-table-lista';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { IAccion } from '../../../../shared/models/accion';

@Component({
  selector: 'app-libro-lista',
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
  templateUrl: './libro-lista.component.html',
  styleUrl: './libro-lista.component.css'
})
export class LibroListaComponent implements AfterViewInit {
  @Input() libroData: MatTableDataSource<ILibroResponse> = new MatTableDataSource<ILibroResponse>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = COLUMNS_TABLE_LIBRO;

  @Output() addLibro = new EventEmitter<IAccion | null>();
  libroAccion: IAccion = {} as IAccion;

  ngAfterViewInit() {
    this.libroData.paginator = this.paginator;
    this.libroData.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.libroData.filter = filterValue.trim().toLowerCase();

    if (this.libroData.paginator) {
      this.libroData.paginator.firstPage();
    }
  }

  accion(idRow: number, accion: string): void {
    this.libroAccion.id = idRow;
    this.libroAccion.accion = accion;
    this.addLibro.emit(this.libroAccion);
  }
}

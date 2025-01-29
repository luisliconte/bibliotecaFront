import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IAutorResponse } from '../../models/autor.response';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { COLUMNS_TABLE_AUTOR } from '../../../../shared/config-tables/columns-table-autor';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { IAccion } from '../../../../shared/models/accion';

@Component({
  selector: 'app-autor-lista',
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
  templateUrl: './autor-lista.component.html',
  styleUrl: './autor-lista.component.css'
})
export class AutorListaComponent implements AfterViewInit {
  @Input() autorData: MatTableDataSource<IAutorResponse> = new MatTableDataSource<IAutorResponse>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = COLUMNS_TABLE_AUTOR;

  @Output() addAutor = new EventEmitter<IAccion | null>();
  autorAccion: IAccion = {} as IAccion;

  ngAfterViewInit() {
    this.autorData.paginator = this.paginator;
    this.autorData.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.autorData.filter = filterValue.trim().toLowerCase();

    if (this.autorData.paginator) {
      this.autorData.paginator.firstPage();
    }
  }

  accion(idRow: number, accion: string): void {
    this.autorAccion.id = idRow;
    this.autorAccion.accion = accion;
    this.addAutor.emit(this.autorAccion);
  }
}

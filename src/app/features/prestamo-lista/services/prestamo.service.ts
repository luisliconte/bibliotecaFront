import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IPrestamoResponse } from '../models/prestamo.response';
import { environment } from '../../../../environment/environment';
import { catchError } from 'rxjs';
import { EndPoints } from '../../../core/end-points/end-point';
import { HandleErrorService } from '../../../shared/services/handle-error.service';
import { IPrestamoRequest } from '../models/prestamo.request';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) { }

  getPrestamo(): Observable<IPrestamoResponse[]> {
    return this.http.get<IPrestamoResponse[]>(`${environment.baseUrl}${EndPoints.PRESTAMO}`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  postPrestamo(prestamo: IPrestamoRequest): Observable<IPrestamoResponse> {
    const url = `${environment.baseUrl}${EndPoints.PRESTAMO}`;
    return this.http.post<IPrestamoResponse>(url, prestamo).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  putPrestamo(prestamo: IPrestamoRequest): Observable<IPrestamoResponse> {
    const url = `${environment.baseUrl}${EndPoints.PRESTAMO}/${prestamo.idPrestamo}`;
    return this.http.put<IPrestamoResponse>(url, prestamo).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  deletePrestamo(idPrestamo: number): Observable<void> {
    const url = `${environment.baseUrl}${EndPoints.PRESTAMO}/${idPrestamo}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  paginacionPrestamo(idPrestamo: number, pagina: number, tamanio: number): Observable<void> {
    const url = `${environment.baseUrl}${EndPoints.PRESTAMO}/${idPrestamo}?pagina=${pagina}&tamanio=${tamanio}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ILibroResponse } from '../models/libro.response';
import { environment } from '../../../../environment/environment';
import { catchError } from 'rxjs';
import { EndPoints } from '../../../core/end-points/end-point';
import { HandleErrorService } from '../../../shared/services/handle-error.service';
import { ILibroRequest } from '../models/libro.request';

@Injectable({
  providedIn: 'root'
})
export class LibroServicesService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) { }

  getLibro(): Observable<ILibroResponse[]> {
    return this.http.get<ILibroResponse[]>(`${environment.baseUrl}${EndPoints.LIBRO}`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  postLibro(libro: ILibroRequest): Observable<ILibroResponse> {
    const url = `${environment.baseUrl}${EndPoints.LIBRO}`;
    return this.http.post<ILibroResponse>(url, libro).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  putLibro(libro: ILibroRequest): Observable<ILibroResponse> {
    const url = `${environment.baseUrl}${EndPoints.LIBRO}/${libro.idLibro}`;
    return this.http.put<ILibroResponse>(url, libro).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  deleteLibro(idLibro: number): Observable<void> {
    const url = `${environment.baseUrl}${EndPoints.LIBRO}/${idLibro}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  paginacionLibro(idLibro: number, pagina: number, tamanio: number): Observable<void> {
    const url = `${environment.baseUrl}${EndPoints.LIBRO}/${idLibro}?pagina=${pagina}&tamanio=${tamanio}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

}

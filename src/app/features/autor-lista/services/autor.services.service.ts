import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { IAutorResponse } from '../models/autor.response';
import { environment } from '../../../../environment/environment';
import { catchError } from 'rxjs';
import { EndPoints } from '../../../core/end-points/end-point';
import { HandleErrorService } from '../../../shared/services/handle-error.service';
import { IAutorRequest } from '../models/autor.request';

@Injectable({
  providedIn: 'root'
})
export class AutorServicesService {

  constructor(
    private http: HttpClient,
    private handleErrorService: HandleErrorService
  ) { }

  getAutor(): Observable<IAutorResponse[]> {
    return this.http.get<IAutorResponse[]>(`${environment.baseUrl}${EndPoints.AUTOR}`).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  postAutor(autor: IAutorRequest): Observable<IAutorResponse> {
    const url = `${environment.baseUrl}${EndPoints.AUTOR}`;
    return this.http.post<IAutorResponse>(url, autor).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  putAutor(autor: IAutorRequest): Observable<IAutorResponse> {
    const url = `${environment.baseUrl}${EndPoints.AUTOR}/${autor.idAutor}`;
    return this.http.put<IAutorResponse>(url, autor).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  deleteAutor(idAutor: number): Observable<void> {
    const url = `${environment.baseUrl}${EndPoints.AUTOR}/${idAutor}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

  paginacionAutor(idAutor: number, pagina: number, tamanio: number): Observable<void> {
    const url = `${environment.baseUrl}${EndPoints.AUTOR}/${idAutor}?pagina=${pagina}&tamanio=${tamanio}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleErrorService.handleError)
    );
  }

}

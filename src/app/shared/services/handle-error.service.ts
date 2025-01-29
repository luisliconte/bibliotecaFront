import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {

     handleError(error: HttpErrorResponse): Observable<never> {
      let errorMessage = 'Algo salió mal; por favor intenta de nuevo más tarde.';
  
      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error en la aplicación: ${error.error.message}`;
      } else {
        errorMessage = `Error en el servidor: ${error.status}`;
      }
      Swal.fire("Error", errorMessage + ' ' + error.message, 'error');
      return throwError(() => new Error(errorMessage));
    }
}
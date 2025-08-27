import {Injectable} from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        if (errorResponse.error?.message && errorResponse.error?.stack && !req.url.includes('/users/refresh')) {
          alert(`${errorResponse.status}: ${errorResponse.error?.message || errorResponse.statusText}`);
        }
        return throwError(() => errorResponse);
      })
    );
  }
}

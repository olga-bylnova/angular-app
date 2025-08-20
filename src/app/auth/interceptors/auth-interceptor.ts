import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private userRefreshTokenApiUrl = 'http://localhost:3000/users/refresh';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token: string | null = null;
    if (typeof window !== 'undefined' && window.localStorage) {
      token = localStorage.getItem("accessToken");
    }

    if (token) {
      req = req.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
    }

    return next.handle(req).pipe(
      catchError(err => {
        if (err.status === 401 && !req.url.includes('/users/refresh')) {
          return this.http.get<{ accessToken: string }>(
            this.userRefreshTokenApiUrl,
            {withCredentials: true}
          ).pipe(
            switchMap(res => {
              localStorage.setItem("accessToken", res.accessToken);
              const newReq = req.clone({
                setHeaders: {Authorization: `Bearer ${res.accessToken}`}
              });
              return next.handle(newReq);
            })
          );
        }
        return throwError(() => err);
      })
    );
  }

  constructor(private http: HttpClient) {
  }
}

import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../shared/models/user';
import {UserAuthResponseDto} from "../models/user-auth-response-dto";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private mainUsersApiUrl = `${environment.apiUrl}/users`;
  private checkIfUserExistsApiUrl = '/check';
  private loginUserApiUrl = '/login';
  private registerUserApiUrl = '/register';
  private sendForgottenPasswordResetLinkApiUrl = '/forgotten-password';
  private resetPasswordApiUrl = '/reset-password';
  private logoutApiUrl = '/logout';

  constructor(private http: HttpClient) {
  }

  getUserByEmailAndPassword(user: User): Observable<UserAuthResponseDto> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true,
    };

    return this.http.post<User>(this.mainUsersApiUrl + this.loginUserApiUrl, user, httpOptions);
  }

  checkIfUserExists(email: string): Observable<boolean> {
    let params = new HttpParams();
    params = params.append('email', email);

    return this.http.get<boolean>(this.mainUsersApiUrl + this.checkIfUserExistsApiUrl, {params});
  }

  createUser(user: User): Observable<UserAuthResponseDto> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      withCredentials: true,
    };
    return this.http.post<User>(this.mainUsersApiUrl + this.registerUserApiUrl, user, httpOptions);
  }

  sendForgottenPasswordResetLink(email: string): Observable<void> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };

    return this.http.post<void>(this.mainUsersApiUrl + this.sendForgottenPasswordResetLinkApiUrl, {email: email}, httpOptions);
  }

  resetPassword(password: string, token: string): Observable<boolean> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
    };

    return this.http.post<boolean>(this.mainUsersApiUrl + this.resetPasswordApiUrl,
      {password: password, token: token}, httpOptions);
  }

  logout(): Observable<void> {
    const httpOptions = {withCredentials: true};
    return this.http.get<void>(this.mainUsersApiUrl + this.logoutApiUrl, httpOptions);
  }
}


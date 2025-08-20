import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../shared/models/user';
import {UserAuthResponseDto} from "../models/user-auth-response-dto";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private mainUsersApiUrl = 'http://localhost:3000/users';
  private checkIfUserExistsApiUrl = '/check';
  private loginUserApiUrl = '/login';
  private registerUserApiUrl = '/register';

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
}


import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersApiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUserByEmailAndPassword(email: string, password: string): Observable<User> {
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('password', password);

    return this.http.get<User>(this.usersApiUrl, { params });
  }

  getUserByEmail(email: string): Observable<User> {
    let params = new HttpParams();
    params = params.append('email', email);

    return this.http.get<User>(this.usersApiUrl, { params });
  }

  createUser(email: string, password: string): Observable<User> {
    let newUser: User = {
      email: email,
      password: password
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<User>(this.usersApiUrl, newUser, httpOptions);
  }
}


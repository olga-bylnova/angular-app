import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { User } from '../../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersApiUrl = 'http://localhost:3000/users';
  private isUserLoggedInSubject = new BehaviorSubject<boolean>(false);
  private messageSubject = new BehaviorSubject<string>('');

  isUserLoggedIn$ = this.isUserLoggedInSubject.asObservable();
  message$ = this.messageSubject.asObservable();

  constructor(private http: HttpClient) { }

  getUserByEmailAndPassword(email: string, password: string): Promise<User> {
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('password', password);

    return firstValueFrom(this.http.get<User>(this.usersApiUrl, { params }));
  }

  getUserByEmail(email: string): Promise<User> {
    let params = new HttpParams();
    params = params.append('email', email);

    return firstValueFrom(this.http.get<User>(this.usersApiUrl, { params }));
  }

  async authenticateUser(email: string, password: string) {
    let user = await this.getUserByEmailAndPassword(email, password);
    if (!this.isArrayEmpty(user)) {
      this.isUserLoggedInSubject.next(true);
    } else {
      this.messageSubject.next('Invalid email or password.');
    }
  }

  async createUser(email: string, password: string) {
    let newUser: User = {
      email: email,
      password: password
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    let existingUser = await this.getUserByEmail(email);

    if (this.isArrayEmpty(existingUser)) {
      this.http.post<User>(this.usersApiUrl, newUser, httpOptions).subscribe(
        userCreated => {
          this.isUserLoggedInSubject.next(true);
        }
      );
    } else {
      this.messageSubject.next('User with such email already exists');
    }
  }

  isArrayEmpty(obj: any): boolean {
    return obj.length === 0;
  }

  logout() {
    this.isUserLoggedInSubject.next(false);
  }

  get isUserLoggedIn(): boolean {
    return this.isUserLoggedInSubject.value;
  }
}


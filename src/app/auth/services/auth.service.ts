import { inject, Injectable } from '@angular/core';
import { UserService } from './user.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from "../../shared/models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userService: UserService;
  private isUserLoggedInSubject = new BehaviorSubject<boolean>(false);
  private messageSubject = new BehaviorSubject<string>('');

  isUserLoggedIn$ = this.isUserLoggedInSubject.asObservable();
  message$ = this.messageSubject.asObservable();

  constructor() {
    this.userService = inject(UserService);
  }

  authenticateUser(user: User) {
    this.userService.getUserByEmailAndPassword(user)
      .subscribe(
        user => {
          if (user) {
            this.isUserLoggedInSubject.next(true);
            if (user.accessToken) {
              localStorage.setItem('accessToken', user.accessToken);
            }
          } else {
            this.messageSubject.next('Invalid email or password.');
          }
        });
  }

  registerUser(user: User) {
    this.userService.checkIfUserExists(user.email)
      .subscribe(isUserExists => {
        if (!isUserExists) {
          this.userService.createUser(user).subscribe(
            (user) => {
              if (user) {
                if (user.accessToken) {
                  localStorage.setItem('accessToken', user.accessToken);
                }
                this.isUserLoggedInSubject.next(true);
              }
            }
          );
        } else {
          this.messageSubject.next('User with such email already exists');
        }
      });
  }

  logout() {
    this.userService.logout().subscribe(
      () => {
        this.isUserLoggedInSubject.next(false);
        localStorage.removeItem('accessToken');
      }
    );
  }

  get isUserLoggedIn(): boolean {
    return this.isUserLoggedInSubject.value;
  }

  sendForgottenPasswordResetLink(email: string): Observable<void> {
    return this.userService.sendForgottenPasswordResetLink(email);
  }

  resetPassword(password: string, token: string): Observable<boolean> {
    return this.userService.resetPassword(password, token);
  }
}

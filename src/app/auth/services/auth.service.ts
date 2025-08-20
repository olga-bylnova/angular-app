import { inject, Injectable } from '@angular/core';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs';
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
    this.isUserLoggedInSubject.next(false);
  }

  get isUserLoggedIn(): boolean {
    return this.isUserLoggedInSubject.value;
  }
}

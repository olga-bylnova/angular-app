import { inject, Injectable } from '@angular/core';
import { UserService } from './user.service';
import { BehaviorSubject } from 'rxjs';

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

  authenticateUser(email: string, password: string) {
    this.userService.getUserByEmailAndPassword(email, password)
      .subscribe(
        user => {
          if (!this.isArrayEmpty(user)) {
            this.isUserLoggedInSubject.next(true);
          } else {
            this.messageSubject.next('Invalid email or password.');
          }
        });
  }

  registerUser(email: string, password: string) {
    this.userService.getUserByEmail(email)
      .subscribe(existingUser => {
        if (this.isArrayEmpty(existingUser)) {
          this.userService.createUser(email, password).subscribe(
            () => {
              this.isUserLoggedInSubject.next(true);
            }
          );;
        } else {
          this.messageSubject.next('User with such email already exists');
        }
      });
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

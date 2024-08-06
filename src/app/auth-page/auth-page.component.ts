import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { skip } from 'rxjs/operators';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})
export class AuthPageComponent {
  authForm: FormGroup;
  isLoginMode: boolean = true;
  userService: UserService = inject(UserService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.userService.message$
      .pipe(
        skip(1)
      )
      .subscribe(message => {
        if (message) {
          alert(message);
        }
      });
  }

  onSwitchMode(event: Event) {
    event.preventDefault();
    this.isLoginMode = !this.isLoginMode;
    this.authForm.reset();
  }

  onSubmit() {
    const email = this.authForm.get('email')?.value;
    const password = this.authForm.get('password')?.value;

    if (this.isLoginMode) {
      this.userService.authenticateUser(email, password);
    } else {
      this.userService.createUser(email, password);
    }

    this.authForm.reset();

    this.userService.isUserLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['']);
      }
    });
  }
}
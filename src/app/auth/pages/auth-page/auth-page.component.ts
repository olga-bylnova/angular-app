import {CommonModule} from '@angular/common';
import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {skip} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {User} from "../../../shared/models/user";

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
  authService: AuthService = inject(AuthService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: false,
    });
  }

  ngOnInit() {
    this.authService.message$
      .pipe(
        skip(1)
      )
      .subscribe(message => {
        if (message) {
          alert(message);
        }
      });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
    this.authForm.reset();
  }

  onSubmit() {
    const email = this.email?.value;
    const password = this.password?.value;
    const rememberMe = this.rememberMe?.value;
    const user: User = {
      email,
      password,
      rememberMe,
    }

    if (this.isLoginMode) {
      this.authService.authenticateUser(user);
    } else {
      this.authService.registerUser(user);
    }

    this.authForm.reset();

    this.authService.isUserLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.router.navigate(['']);
      }
    });
  }

  get password() {
    return this.authForm.get('password');
  }

  get email() {
    return this.authForm.get('email');
  }

  get rememberMe() {
    return this.authForm.get('rememberMe');
  }
}

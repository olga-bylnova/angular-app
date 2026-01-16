import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { skip } from 'rxjs/operators';
import { Store } from "@ngrx/store";
import { AuthState } from "../../../store/models/auth.model";
import { login, register } from "../../../store/actions/auth.actions";
import { selectAuthError } from "../../../store/selectors/auth.selectors";

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})
export class AuthPageComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private store = inject(Store<AuthState>);

  authForm: FormGroup;
  isLoginMode: boolean = true;

  constructor() {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.store.select(selectAuthError)
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

    if (this.isLoginMode) {
      this.store.dispatch(login({email, password}));
    } else {
      this.store.dispatch(register({email, password}));
    }

    this.authForm.reset();
  }

  get password() {
    return this.authForm.get('password');
  }

  get email() {
    return this.authForm.get('email');
  }
}

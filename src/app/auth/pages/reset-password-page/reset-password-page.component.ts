import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-reset-password-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './reset-password-page.component.html',
  styleUrl: './reset-password-page.component.css'
})
export class ResetPasswordPageComponent {
  resetPasswordForm: FormGroup;
  authService: AuthService = inject(AuthService);
  route: ActivatedRoute = inject(ActivatedRoute);
  showSuccessMessage: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    const password = this.password?.value;
    const token = this.route.snapshot.params['token'];

    this.authService.resetPassword(password, token).subscribe(isResetSuccessful => {
      if (isResetSuccessful) {
        this.showSuccessMessage = true;
      }
    });
  }

  get password() {
    return this.resetPasswordForm.get('password');
  }
}

import { LoginRequest, LoginResponse } from './../interfaces/login.interface';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loginError: string | null = null;

  loginForm = this.fb.group({
    email: ['jhon.doe@test.com', [Validators.required, Validators.email]],
    password: ['123456', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  get emailControl() {
    return this.loginForm.controls.email;
  }

  get passwordControl() {
    return this.loginForm.controls.password;
  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.loginForm.markAllAsTouched();
    }

    this.authService.login(this.loginForm.value as LoginRequest).subscribe({
      next: (res: LoginResponse) => {
        if (res) {
          this.loginForm.reset();
          this.router.navigateByUrl('/home');
        } else {
          alert('Credenciales incorrectas');
        }
      },
      error: (err) => {
        this.loginError = err;
      },
      complete: () => {
        console.log('login complete');
      },
    });
  }
}

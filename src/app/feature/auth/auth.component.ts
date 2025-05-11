import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../core/services/notification.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
})
export class AuthComponent {
  isLoginMode = true;
  authForm: FormGroup;
  isPasswordVisible = false;
  passwordLength: number | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.authForm = this.createLoginForm();
    this.authForm.get('password')?.valueChanges.subscribe(value => {
      this.passwordLength = value?.length ?? 0;
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.authForm = this.isLoginMode ? this.createLoginForm() : this.createRegisterForm();
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  onPasswordChange() {
    const password = this.authForm.get('password')?.value;
    this.passwordLength = password ? password.length : 0;
  }

  onForgotPassword(event: Event) {
    event.preventDefault();
    this.notificationService.showError('Функція відновлення пароля поки не реалізована.');
  }

  private createLoginForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  private createRegisterForm(): FormGroup {
    return this.fb.group(
      {
        firstname: ['', Validators.required],
        secondname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            this.passwordStrengthValidator(),
          ],
        ],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator() }
    );
  }

  private passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const value = control.value;
      if (!value) return null;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const isValid = hasUpperCase && hasNumber;
      return isValid ? null : { weakPassword: true };
    };
  }

  private passwordMatchValidator(): ValidatorFn {
    return (form: AbstractControl): { [key: string]: boolean } | null => {
      const password = form.get('password')?.value;
      const confirm = form.get('confirmPassword')?.value;
      return password && confirm && password !== confirm
        ? { passwordMismatch: true }
        : null;
    };
  }

  hasUpperCase(): boolean {
    const value = this.authForm.get('password')?.value;
    return /[A-Z]/.test(value);
  }

  hasNumber(): boolean {
    const value = this.authForm.get('password')?.value;
    return /[0-9]/.test(value);
  }

  onSubmit() {
    if (this.authForm.invalid) return;

    if (this.isLoginMode) {
      this.authService
        .login(this.authForm.value.email, this.authForm.value.password)
        .subscribe(
          (response) => {
            this.notificationService.showSuccess(response.message || 'Успішний вхід');
            this.router.navigate(['']);
          },
          (error) => {
            this.notificationService.showError(error.error.message || 'Невірний email або пароль');
          }
        );
    } else {
      this.authService
        .register(
          this.authForm.value.firstname,
          this.authForm.value.secondname,
          this.authForm.value.email,
          this.authForm.value.password
        )
        .subscribe(
          (response) => {
            this.notificationService.showSuccess(response.message || 'Успішна реєстрація');
            this.toggleMode();
          },
          (error) => {
            this.notificationService.showError(error.error.message || 'Реєстрація не вдалася');
          }
        );
    }
  }
}

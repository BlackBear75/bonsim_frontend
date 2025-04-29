import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  templateUrl: './auth.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  isLoginMode = true;
  authForm: FormGroup;
  isPasswordVisible = false;  // Створюємо змінну для контролю видимості пароля

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;  // Перемикаємо видимість
  }
  constructor(private fb: FormBuilder) {
    this.authForm = this.createLoginForm();
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.authForm = this.isLoginMode ? this.createLoginForm() : this.createRegisterForm();
  }

  private createLoginForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  private createRegisterForm(): FormGroup {
    return this.fb.group({
      firstname: ['', Validators.required],
      secondname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    if (this.isLoginMode) {
      console.log('Login:', this.authForm.value);
      // TODO: Вхід
    } else {
      console.log('Register:', this.authForm.value);
      // TODO: Реєстрація
    }
  }
  onForgotPassword(event: Event) {
    event.preventDefault(); // щоб не перезавантажувалась сторінка
    console.log('Переходимо на форму відновлення пароля');
    // або тут міняєш стан форми
  }


}

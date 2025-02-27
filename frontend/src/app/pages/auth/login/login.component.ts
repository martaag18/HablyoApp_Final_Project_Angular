import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { RouterLink } from '@angular/router';
import { MyButtonComponent } from '../../../shared/ui/my-button/my-button.component';
import { TextInputComponent } from '../../../shared/components/text-input/text-input.component';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, RouterLink, MyButtonComponent, TextInputComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  loginError: string | null = null;

  onSubmitLogin(): void {
    if (this.loginForm.valid) {
      const loginData = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      };
      this.authService.login(loginData).subscribe({
        next: (res) => {
          console.log('Login exitoso:', res),
          alert("Inicio de sesión exitoso!")
          this.router.navigate([""])
        },
        error: (err) => {
          console.error('Error al iniciar sesión:', err);
          this.loginError = err.error?.message || 'Error al iniciar sesión';
        },
      });
    } 
  }
}

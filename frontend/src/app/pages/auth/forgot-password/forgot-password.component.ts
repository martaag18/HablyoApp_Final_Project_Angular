import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { MyButtonComponent } from '../../../shared/ui/my-button/my-button.component';
import { TextInputComponent } from '../../../shared/components/forms/text-input/text-input.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MyButtonComponent,
    TextInputComponent
  ],
  templateUrl: './forgot-password.component.html'
})
export class ForgotPasswordComponent {
  private authService = inject(AuthService);

  // Creamos el FormGroup con un único campo email
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  forgotError: string | null = null;
  forgotSuccess: string | null = null;

  onSubmitForgotPassword(): void {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email!;
      // Llamamos a nuestro servicio Auth para gestionar la petición
      this.authService.forgotPassword(email).subscribe({
        next: (res) => {
          // Mensaje de éxito (puede ser algo genérico por seguridad)
          this.forgotSuccess =
            'Si existe un usuario con ese correo, se ha enviado un enlace de recuperación.';
        },
        error: (err) => {
          console.error('Error en forgotPassword:', err);
          this.forgotError = 'Ha ocurrido un error. Inténtalo de nuevo más tarde.';
        }
      });
    }
  }
}

import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { MyButtonComponent } from '../../../shared/ui/my-button/my-button.component';
import { TextInputComponent } from '../../../shared/components/forms/text-input/text-input.component';
import { passwordMatchValidator } from '../../../shared/validators/custom-validators.component';
import { NotificationService } from '../../../shared/services/notification-service.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, MyButtonComponent, TextInputComponent],
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private authService = inject(AuthService);
  private notificationService = inject(NotificationService)

  resetForm = new FormGroup(
    {
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    },
    { validators: [passwordMatchValidator] }
  );
  
  token: string | null = null;
  errorMessage = '';
  successMessage = '';

  ngOnInit(): void { //se ejecuta cuando el componente se cara
    // Obtenemos el token del query param: ?token=XYZ
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (!this.token) {
      this.router.navigate(['/login']);
    }
  }

  onSubmit() {
    if (!this.token) {
      this.errorMessage = 'Token no encontrado en la URL';
      return;
    }

    if (this.resetForm.invalid) {
      this.errorMessage = 'Formulario inválido';
      return;
    }

    const newPassword = this.resetForm.value.newPassword!;
    const confirmPassword = this.resetForm.value.confirmPassword!;

    if (newPassword !== confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden';
      return;
    }

    // Llamamos al AuthService para enviar la petición al backend
    this.authService.resetPassword(this.token, newPassword).subscribe({
      next: (res) => {
        this.successMessage = 'Contraseña actualizada con éxito. ¡Ya puedes iniciar sesión!';
        setTimeout(() => this.router.navigate(['/login']), 3000);
      },
      error: (err) => {
        console.error('Error al resetear contraseña:', err);
        this.errorMessage = 'Error al resetear contraseña. Token inválido o expirado.';
        this.notificationService.error("Error al registrarse");

      },
    });
  }
}

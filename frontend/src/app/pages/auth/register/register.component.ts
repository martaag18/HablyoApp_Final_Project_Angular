import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { inject } from '@angular/core';
import { WhitelistService } from '../../../services/auth/whitelist.service';
import { passwordMatchValidator } from '../../../shared/validators/custom-validators.component';
import { Register } from '../../../shared/interfaces/register.interface';
import { RegisterService } from '../../../services/auth/register.service';
import { Router } from '@angular/router';
import { RegisterStep1Component } from './register-step1/register-step1.component';
import { RegisterStep2Component } from './register-step2/register-step2.component';
import { RegisterStep3Component } from './register-step3/register-step3.component';
import { NgStyle } from '@angular/common';
import { MyButtonComponent } from '../../../shared/ui/my-button/my-button.component';
import { NotificationService } from '../../../shared/services/notification-service.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RegisterStep1Component,
    RegisterStep2Component,
    RegisterStep3Component,
    NgStyle,
    MyButtonComponent
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private whitelistService = inject(WhitelistService);
  private registerService = inject(RegisterService);
  private router = inject(Router);
  private notificationService = inject(NotificationService)

  currentStep: number = 1;
  emailNotAllowed = false;

  registerForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(1)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required]),
    },
    { validators: [passwordMatchValidator] }
  );

  // Navegar al siguiente paso
  goToNextStep(): void {
    // Opcional: valida campos específicos del paso actual
    if (this.isStepValid(this.currentStep)) {
      this.currentStep++;
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  // Navegar al paso anterior
  goToPreviousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  // Verificar validez de los campos del paso actual
  isStepValid(step: number): boolean {
    switch (step) {
      case 1:
        return this.registerForm.controls['name'].valid 
            && this.registerForm.controls['surname'].valid;
      case 2:
        return this.registerForm.controls['age'].valid;
      case 3:
        return this.registerForm.controls['email'].valid 
            && this.registerForm.controls['password'].valid
            && this.registerForm.controls['repeatPassword'].valid;
      default:
        return false;
    }
  }

  // Enviar registro al backend
  submitRegister(): void {
    // Valida formulario completo antes de enviar
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.checkWhitelist();
  }

  private checkWhitelist(): void {
    const emailValue = this.registerForm.get('email')?.value;
    if (emailValue) {
      this.whitelistService.checkEmail(emailValue).subscribe({
        next: (res) => {
          if (!res.whitelisted) {
            this.emailNotAllowed = true;
          } else {
            this.emailNotAllowed = false;
            this.createUser();
          }
        },
        error: (err) => {
          console.error('Error al verificar whitelist:', err);
          this.emailNotAllowed = true;
        },
      });
    }
  }

  private createUser(): void {
    const ageValue = this.registerForm.value.age!;
    const ageNumber = Number(ageValue);

    const data: Register = {
      name: this.registerForm.value.name!,
      surname: this.registerForm.value.surname!,
      age: ageNumber,
      email: this.registerForm.value.email!,
      password: this.registerForm.value.password!,
    };
    console.log('submitRegister() invocado');

    this.registerService.registerUser(data).subscribe({
      next: (response) => {
        console.log('Registro exitoso', response.message);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error al registrar usuario', err);
        console.error('Mensajes de validación:', err.error.message);
        this.notificationService.error("Error al registrarse", err.error.message);
      },
    });
  }
}

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

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RegisterStep1Component, RegisterStep2Component, RegisterStep3Component, NgStyle],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private whitelistService = inject(WhitelistService);
  private registerService = inject(RegisterService);
  private router = inject(Router);

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

  submitRegister(): void {
    //Verificar si formulario es válido
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
    } else {
      this.checkWhitelist();
    }
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
    //Convertir age a number
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
        alert(err.error.message || 'Registration failed');
      },
    });
  }

  goToNextStep(): void {
    this.currentStep++;
  }

  goToPreviousStep(): void {
    this.currentStep--;
  }
}

/* TEORIA

- Elementos del formulario -> heredan la clase base AbstractControl -> validadores funciones genéricas, capaces de recibir cualquier tipo de control
- Cuando llamamos a un validador -> pasamos como parámetro AbstractControl que luego puedes convertir a FormGroup.
*/

import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhitelistService } from '../../../services/whitelist.service';
import { passwordMatchValidator } from '../../../shared/validators/custom-validators.component';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {

  private whitelistService = inject(WhitelistService);

  currentStep: number = 1;
  emailNotAllowed = false;


  registerForm = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(1)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required]),
    },
    { validators: [passwordMatchValidator] }
  );
  

  submitRegister() {
    const emailValue = this.registerForm.get('email')?.value;
    if (emailValue) {
      this.whitelistService.checkEmail(emailValue).subscribe({
        next: (res) => {
          if (!res.whitelisted) {
            this.emailNotAllowed = true;
          } else {
            this.emailNotAllowed = false;
            console.log("Email con acceso")
          }
        },
        error: (err) => {
          console.error('Error al verificar whitelist:', err);
          this.emailNotAllowed = true;
        },
      });
    }
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
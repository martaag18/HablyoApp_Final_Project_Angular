import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

  
  export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const formGroup = control as FormGroup; 
    const password = formGroup.get('password')?.value;
    const repeatPassword = formGroup.get('repeatPassword')?.value;

    if (password !== repeatPassword) {
      formGroup.get('repeatPassword')?.setErrors({ mismatch: true });
    } else {
      formGroup.get('repeatPassword')?.setErrors(null);
    }
    return null; 
}


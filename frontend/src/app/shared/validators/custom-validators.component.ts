import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const formGroup = control as FormGroup;
  const password = formGroup.get('password')?.value;
  const repeatPassword = formGroup.get('repeatPassword')?.value;

  if (!password || !repeatPassword) return null; // Opcional

  if (password !== repeatPassword) {
    formGroup.get('repeatPassword')?.setErrors({ misMatch: true });
    return { misMatch: true };
  } else {
    const repeatPassControl = formGroup.get('repeatPassword');
    if (repeatPassControl?.errors) {
      delete repeatPassControl.errors['mismatch'];
      if (Object.keys(repeatPassControl.errors).length === 0) {
        repeatPassControl.setErrors(null);
      }
    }
    return null;
  }
}



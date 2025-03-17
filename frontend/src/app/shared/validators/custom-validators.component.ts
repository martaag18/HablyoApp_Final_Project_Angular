import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

  
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const formGroup = control as FormGroup;
  const password = formGroup.get('password')?.value;
  const repeatPassword = formGroup.get('repeatPassword')?.value;

  if (!password || !repeatPassword) return null; // Opcional

  if (password !== repeatPassword) {
    // Marca 'repeatPassword' como inválido
    formGroup.get('repeatPassword')?.setErrors({ misMatch: true });
    // Marca también el formGroup con un error global (opcional)
    return { misMatch: true };
  } else {
    // Limpia el error en 'repeatPassword'
    const repeatPassControl = formGroup.get('repeatPassword');
    if (repeatPassControl?.errors) {
      delete repeatPassControl.errors['mismatch'];
      if (Object.keys(repeatPassControl.errors).length === 0) {
        repeatPassControl.setErrors(null);
      }
    }
    // Sin error global
    return null;
  }
}



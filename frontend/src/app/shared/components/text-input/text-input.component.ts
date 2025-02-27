import { Component, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  imports: [ReactiveFormsModule],
  templateUrl: './text-input.component.html',
})
export class TextInputComponent {
  //Muestra y gestiona la UI:
  //TextInput recibe via @Input del componente padre:
  @Input() control!: AbstractControl;
  @Input() label!: string; // Etiqueta para mostrar en los errores
  @Input() placeholder: string = ''; // Placeholder
  @Input() type: string = 'text'; // Tipo del input (text, email, password..)

  get controlAsFormControl(): FormControl {
    return this.control as FormControl;
  }
}

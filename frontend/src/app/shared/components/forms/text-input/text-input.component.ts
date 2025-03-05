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

  @Input() control!: AbstractControl;
  @Input() label!: string; 
  @Input() placeholder: string = ''; 
  @Input() type: string = 'text'; 

  get controlAsFormControl(): FormControl {
    return this.control as FormControl;
  }
}

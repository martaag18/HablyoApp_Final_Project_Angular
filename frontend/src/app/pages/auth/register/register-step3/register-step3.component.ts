import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TextInputComponent } from '../../../../shared/components/forms/text-input/text-input.component';

@Component({
  selector: 'app-register-step3',
  imports: [TextInputComponent],
  templateUrl: './register-step3.component.html',
  // styleUrl: './register-step3.component.scss'
})
export class RegisterStep3Component {

  @Input() parentForm!: FormGroup;

}

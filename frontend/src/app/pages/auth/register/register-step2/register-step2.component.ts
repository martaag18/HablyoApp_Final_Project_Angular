import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TextInputComponent } from '../../../../shared/components/forms/text-input/text-input.component';

@Component({
  selector: 'app-register-step2',
  imports: [TextInputComponent],
  templateUrl: './register-step2.component.html'
})
export class RegisterStep2Component {

  @Input() parentForm!: FormGroup;

}

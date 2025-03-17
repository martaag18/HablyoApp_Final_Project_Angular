import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../../../../shared/components/forms/text-input/text-input.component';

@Component({
  selector: 'app-register-step1',
  imports: [TextInputComponent, ReactiveFormsModule],
  templateUrl: './register-step1.component.html'
})
export class RegisterStep1Component {

  @Input() parentForm!: FormGroup;

}

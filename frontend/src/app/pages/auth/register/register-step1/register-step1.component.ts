import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '../../../../shared/components/forms/text-input/text-input.component';
import { MyButtonComponent } from '../../../../shared/ui/my-button/my-button.component';

@Component({
  selector: 'app-register-step1',
  imports: [TextInputComponent, ReactiveFormsModule, MyButtonComponent],
  templateUrl: './register-step1.component.html'
})
export class RegisterStep1Component {

  @Input() parentForm!: FormGroup;
  @Output() nextStep = new EventEmitter<void>(); //Emitimos evento del hijo al padre -> nextStep

  get nameControl() {
    return this.parentForm.get('name');
  }

  goNext() {
    if (this.parentForm.get('name')?.valid && this.parentForm.get('surname')?.valid) {
      this.nextStep.emit();
    }
  }
}

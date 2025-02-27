import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MyButtonComponent } from '../../../../shared/ui/my-button/my-button.component';
import { TextInputComponent } from '../../../../shared/components/text-input/text-input.component';

@Component({
  selector: 'app-register-step2',
  imports: [MyButtonComponent, TextInputComponent],
  templateUrl: './register-step2.component.html'
})
export class RegisterStep2Component {

  @Input() parentForm!: FormGroup;
  @Output() nextStep = new EventEmitter<void>();
  @Output() previousStep = new EventEmitter<void>();

  goNext() {
    if (this.parentForm.get('age')?.valid) {
      this.nextStep.emit();
    }
  }

  goPrevious() {
    this.previousStep.emit();
  }
}

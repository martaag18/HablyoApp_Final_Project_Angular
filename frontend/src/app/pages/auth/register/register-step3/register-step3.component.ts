import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MyButtonComponent } from '../../../../shared/ui/my-button/my-button.component';
import { TextInputComponent } from '../../../../shared/components/forms/text-input/text-input.component';

@Component({
  selector: 'app-register-step3',
  imports: [MyButtonComponent, TextInputComponent],
  templateUrl: './register-step3.component.html',
  styleUrl: './register-step3.component.scss'
})
export class RegisterStep3Component {

  @Input() parentForm!: FormGroup;
  @Output() previousStep = new EventEmitter<void>();

  goPrevious() {
    this.previousStep.emit();
  }
}

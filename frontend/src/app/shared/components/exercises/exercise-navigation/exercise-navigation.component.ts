import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MyButtonComponent } from '../../../ui/my-button/my-button.component';

@Component({
  imports: [MyButtonComponent],
  selector: 'app-exercise-navigation',
  templateUrl: './exercise-navigation.component.html',
  styleUrls: ['./exercise-navigation.component.scss']
})
export class ExerciseNavigationComponent {
  
  @Input() showPrevious = false;

  @Output() next = new EventEmitter<void>();
  @Output() previous = new EventEmitter<void>();
}

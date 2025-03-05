import { Component, EventEmitter, Output } from '@angular/core';
import { MyButtonComponent } from '../../../ui/my-button/my-button.component';

@Component({
  imports: [MyButtonComponent],
  selector: 'app-exercise-actions',
  templateUrl: './exercise-actions.component.html',
  styleUrls: ['./exercise-actions.component.scss']
})
export class ExerciseActionsComponent {
 
  @Output() complete = new EventEmitter<void>();
  @Output() solve = new EventEmitter<void>();
  @Output() restart = new EventEmitter<void>();
}

import { Component, signal } from '@angular/core';
import { EXERCISE_EXPLANATION_DOBLE_VOCAL } from '../data/mocks/exercise-doble-vocal-explanation.mock';
import { MyButtonComponent } from '../../../../../shared/ui/my-button/my-button.component';

@Component({
  selector: 'app-exercise-doble-vocal-home',
  imports: [MyButtonComponent],
  templateUrl: './exercise-doble-vocal-home.component.html',
  styleUrl: './exercise-doble-vocal-home.component.scss'
})
export class ExerciseDobleVocalHomeComponent {

  explanation = signal(EXERCISE_EXPLANATION_DOBLE_VOCAL);

 
}

import { Component, signal } from '@angular/core';
import { EXERCISE_EXPLANATION_DOBLE_VOCAL } from '../data/mocks/exercise-doble-vocal-explanation.mock';
import { MyButtonComponent } from '../../../../../shared/ui/my-button/my-button.component';
import { AUDIO_FILES_VOCAL } from '../../exercise-vocal/data/mocks/audio-files.mock';

@Component({
  selector: 'app-exercise-doble-vocal-home',
  imports: [MyButtonComponent],
  templateUrl: './exercise-doble-vocal-home.component.html',
  styleUrl: './exercise-doble-vocal-home.component.scss'
})
export class ExerciseDobleVocalHomeComponent {

  explanation = signal(EXERCISE_EXPLANATION_DOBLE_VOCAL);

  audios = signal(AUDIO_FILES_VOCAL);

  audioUrl = signal<string | null>(null);

  onLoadAudio() {
    this.audioUrl.set(this.audios()[0].url);
  }
 
}

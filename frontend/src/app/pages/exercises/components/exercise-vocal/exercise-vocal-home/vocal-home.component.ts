import { Component, signal } from '@angular/core';
import { MyButtonComponent } from '../../../../../shared/ui/my-button/my-button.component';
import { RouterLink } from '@angular/router';
import { AUDIO_FILES } from '../data/mocks/audio-files.mock';
import { EXERCISE_EXPLANATION_VOCAL_FINAL_VOCAL_INICIAL } from '../data/mocks/exercise-vocal-explanation.mock';

@Component({
  standalone: true,
  imports: [MyButtonComponent, RouterLink],
  selector: 'app-exercise-detail',
  templateUrl: './vocal-home.component.html',
  styleUrls: ['./vocal-home.component.scss']
})
export class VocalHomeComponent {

  explanation = signal(EXERCISE_EXPLANATION_VOCAL_FINAL_VOCAL_INICIAL);

  audios = signal(AUDIO_FILES);

  audioUrl = signal<string | null>(null);

  onLoadAudio() {
    // Cargamos el primer audio, por ejemplo
    this.audioUrl.set(this.audios()[0].url);
  }
}

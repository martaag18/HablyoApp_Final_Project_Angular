import { Component, signal } from '@angular/core';
import { MyButtonComponent } from '../../../../../shared/ui/my-button/my-button.component';
import { AUDIO_FILES_VOCAL } from '../data/mocks/audio-files.mock';
import { AudioPlayerComponent } from '../../../../../shared/components/exercises/audio-player/audio-player.component';

@Component({
  selector: 'app-exercise-1-explanation',
  imports: [MyButtonComponent, AudioPlayerComponent],
  templateUrl: './exercise-1-explanation.component.html',
  styleUrl: './exercise-1-explanation.component.scss'
})
export class Exercise1ExplanationComponent {

  // Supongamos que coges el primer audio del mock
  audioList = signal(AUDIO_FILES_VOCAL);
  audioUrl = signal<string | null>(null);

  constructor() {
    // Asignamos el primer audio por defecto
    if (this.audioList().length > 0) {
      this.audioUrl.set(this.audioList()[0].url);
    }
  }


}

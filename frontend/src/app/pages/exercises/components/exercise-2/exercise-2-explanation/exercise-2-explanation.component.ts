import { Component, signal } from '@angular/core';
import { AUDIO_FILES_2 } from '../data/mocks/audio-files_2.mock';
import { AudioPlayerComponent } from '../../../../../shared/components/exercises/audio-player/audio-player.component';
import { MyButtonComponent } from '../../../../../shared/ui/my-button/my-button.component';

@Component({
  selector: 'app-exercise-2-explanation',
  imports: [AudioPlayerComponent, MyButtonComponent],
  templateUrl: './exercise-2-explanation.component.html',
  // styleUrl: './exercise-2-explanation.component.scss'
})
export class Exercise2ExplanationComponent {

    // Supongamos que coges el primer audio del mock
    audioList = signal(AUDIO_FILES_2);
    audioUrl = signal<string | null>(null);
  
    constructor() {
      // Asignamos el primer audio por defecto
      if (this.audioList().length > 0) {
        this.audioUrl.set(this.audioList()[0].url);
      }
    }
  
}

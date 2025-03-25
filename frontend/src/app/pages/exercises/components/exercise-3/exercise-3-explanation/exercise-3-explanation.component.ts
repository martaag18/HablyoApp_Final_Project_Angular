import { Component, signal } from '@angular/core';
import { AUDIO_FILES_3 } from '../data/mocks/audio-files.mock';
import { MyButtonComponent } from '../../../../../shared/ui/my-button/my-button.component';
import { AudioPlayerComponent } from '../../../../../shared/components/exercises/audio-player/audio-player.component';
@Component({
  selector: 'app-exercise-3-explanation',
  imports: [MyButtonComponent, AudioPlayerComponent],
  templateUrl: './exercise-3-explanation.component.html',
  styleUrl: './exercise-3-explanation.component.scss'
})
export class Exercise3ExplanationComponent {

  audioList = signal(AUDIO_FILES_3);
  audioUrl = signal<string | null>(null);

  constructor() {
    if (this.audioList().length > 0) {
      this.audioUrl.set(this.audioList()[0].url);
    }
  }
}

import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { MyButtonComponent } from '../../../ui/my-button/my-button.component';

@Component({
  selector: 'app-audio-player',
  imports: [MyButtonComponent],
  templateUrl: './audio-player.component.html',
  // styleUrl: './audio-player.component.scss'
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AudioPlayerComponent {

  @Input() audioSource: string | null = null;

  isAudioVisible = signal<boolean>(false);

  onLoadAudio(): void {
    if (this.audioSource) {
      this.isAudioVisible.set(true);
    } else {
      console.warn('No hay audioSource definido');
    }
  }
}

import { Component, Input, signal } from '@angular/core';
import { MyButtonComponent } from '../../../ui/my-button/my-button.component';

@Component({
  selector: 'app-audio-player',
  imports: [MyButtonComponent],
  templateUrl: './audio-player.component.html',
  styleUrl: './audio-player.component.scss'
})
export class AudioPlayerComponent {

  // Recibe la URL del audio
  @Input() audioSource: string | null = null;

  // Usamos una señal para controlar si el reproductor se muestra o no (opcional)
  isAudioVisible = signal<boolean>(false);

  // Al hacer clic en el botón
  onLoadAudio(): void {
    // Si ya hay un audioSource, simplemente mostramos el reproductor
    if (this.audioSource) {
      this.isAudioVisible.set(true);
    } else {
      console.warn('No hay audioSource definido');
    }
  }
}

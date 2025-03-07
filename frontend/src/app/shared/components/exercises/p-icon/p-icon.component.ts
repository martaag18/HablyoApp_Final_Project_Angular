import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-p-icon',
  imports: [],
  templateUrl: './p-icon.component.html',
  styleUrls: ['./p-icon.component.scss'] // <-- styleUrls en plural
})
export class PIconComponent {

  @Output() dragStarted = new EventEmitter<DragEvent>();

  onDragStart(event: DragEvent) {
    // Ponemos 'P' en los datos arrastrados
    event.dataTransfer?.setData('text/plain', 'P');
    // Emitimos el evento con el DragEvent para que el padre sepa que se inicia
    this.dragStarted.emit(event);
  }
}

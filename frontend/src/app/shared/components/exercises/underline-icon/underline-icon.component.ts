import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-underline-icon',
  imports: [],
  templateUrl: './underline-icon.component.html',
  styleUrls: ['./underline-icon.component.scss']
})
export class UnderlineIconComponent {
  @Output() dragStarted = new EventEmitter<DragEvent>();

  // Evento cuando se inicia el arrastre -> establece en dataTransfer el valor "underline"
  onDragStart(event: DragEvent) {
    event.dataTransfer?.setData('text/plain', 'underline');
    this.dragStarted.emit(event);
  }
}

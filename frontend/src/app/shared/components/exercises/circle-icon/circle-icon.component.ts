import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-circle-icon',
  imports: [],
  templateUrl: './circle-icon.component.html',
  styleUrl: './circle-icon.component.scss'
})
export class CircleIconComponent {

  @Output() dragStarted = new EventEmitter<DragEvent>();

  onDragStart(event: DragEvent): void {
    // Se establece la marca 'circle' para identificar el componente en el drag & drop
    event.dataTransfer?.setData('text/plain', 'circle');
    this.dragStarted.emit(event);
  }
}

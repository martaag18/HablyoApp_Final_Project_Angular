import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-accent-icon',
  templateUrl: './accent-icon.component.html',
  styleUrls: ['./accent-icon.component.scss']
})
export class AccentIconComponent {
  @Output() dragStarted = new EventEmitter<DragEvent>();


  onDragStart(event: DragEvent) {
    event.dataTransfer?.setData('text/plain', '´');
    this.dragStarted.emit(event);
  }
}

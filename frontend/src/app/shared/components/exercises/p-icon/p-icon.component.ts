import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-p-icon',
  imports: [],
  templateUrl: './p-icon.component.html',
  styleUrls: ['./p-icon.component.scss'] 
})
export class PIconComponent {

  @Output() dragStarted = new EventEmitter<DragEvent>();

  onDragStart(event: DragEvent) {
    event.dataTransfer?.setData('text/plain', 'P');
    this.dragStarted.emit(event);
  }
}

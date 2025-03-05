import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-arc-icon',
  templateUrl: './arc-icon.component.html',
  styleUrls: ['./arc-icon.component.scss']
})
export class ArcIconComponent {
  @Output() dragStarted = new EventEmitter<DragEvent>();


  onDragStart(event: DragEvent) {
    event.dataTransfer?.setData('text/plain', 'arc');
    this.dragStarted.emit(event);
  }

}

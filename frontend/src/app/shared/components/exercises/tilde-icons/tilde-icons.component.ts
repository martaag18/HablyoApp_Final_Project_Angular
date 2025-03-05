import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-tilde-icon',
  templateUrl: './tilde-icons.component.html',
  styleUrls: ['./tilde-icons.component.scss']
})
export class TildeIconComponent {
  @Output() dragStarted = new EventEmitter<DragEvent>();


  onDragStart(event: DragEvent) {
    event.dataTransfer?.setData('text/plain', '´');
    this.dragStarted.emit(event);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-button',
  imports: [RouterLink, CommonModule],
  templateUrl: './my-button.component.html',
  styleUrls: ['./my-button.component.scss']
})
export class MyButtonComponent {

  @Input() label: string = 'Click';
  @Input() color: 'primary' | 'secondary' = 'primary';
  @Input() disabled: boolean = false;
  @Input() routerLink?: string | any[];

  //Evento que se dispara cuando se hace clic en el botón
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    // Se avisa al padre que hacemos click
    this.clicked.emit();
  }

  computeClasses(): string {
    const baseClasses ='mx-auto cursor-pointer text-white px-6 py-3 rounded-md font-bold transition-all duration-300';
  
    if (this.color === 'primary') {
      return `${baseClasses} bg-primary hover:bg-[#d73232]`;
    } else if (this.color === 'secondary') {
      return `${baseClasses} bg-secondary w-full hover:bg-[#2cb8a9]`;
    } else if (this.color === 'tertiary') {
      return `${baseClasses} bg-tertiary hover:bg-[#d9a300]`;
    } else {
      return `${baseClasses} bg-gray-600 hover:bg-gray-700`;
    }
  }  
}



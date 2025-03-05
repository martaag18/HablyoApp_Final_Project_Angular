import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-button',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './my-button.component.html',
  styleUrls: ['./my-button.component.scss']
})
export class MyButtonComponent {

  @Input() label: string = 'Click';
  @Input() color: string = 'primary';
  @Input() disabled: boolean = false;
  @Input() routerLink?: string | any[];

  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }

  computeClasses(): string {
    const baseClasses = 'mx-auto cursor-pointer px-6 py-3 rounded-md font-bold transition-all duration-300';
  
    if (this.color === 'primary') {
      return `${baseClasses} text-white bg-primary hover:bg-[#d73232]`;
    } else if (this.color === 'secondary') {
      return `${baseClasses} text-white bg-secondary w-full hover:bg-[#2cb8a9]`;
    } else if (this.color === 'tertiary') {
      return `${baseClasses} text-white bg-tertiary hover:bg-[#d9a300]`;
    } else if (this.color === 'success') {
      return `${baseClasses} text-white bg-green-600 hover:bg-green-700`;
    } else if (this.color === 'blue') {
      return `${baseClasses} border border-blue-800 text-blue-800 bg-transparent hover:bg-blue-900 hover:text-white`;
    } else {
      return `${baseClasses} text-white bg-gray-600 hover:bg-gray-700`;
    }
  }
}  

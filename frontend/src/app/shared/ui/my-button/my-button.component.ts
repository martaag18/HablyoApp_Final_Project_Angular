import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-button',
  imports: [RouterLink, NgClass],
  templateUrl: './my-button.component.html',
  styleUrls: ['./my-button.component.scss']
})
export class MyButtonComponent {
  @Input() label: string = 'Click';
  @Input() color: string = 'primary';
  @Input() disabled: boolean = false;
  @Input() routerLink?: string | any[];
  
  @Output() clicked = new EventEmitter<void>();

  private readonly baseClasses = 'mx-auto cursor-pointer px-6 py-3 rounded-md font-bold transition-all duration-300';

  // Objeto - asocio colores a sus clases
  private readonly colorClasses: { [key: string]: string } = {
    primary: 'text-white bg-primary hover:bg-[#d73232]',
    secondary: 'text-white bg-secondary w-full hover:bg-[#2cb8a9]',
    tertiary: 'text-white bg-tertiary hover:bg-[#d9a300]',
    success: 'text-white bg-green-600 hover:bg-green-700',
    blue: 'border border-blue-800 text-blue-800 bg-transparent hover:bg-blue-900 hover:text-white',
    blueLight: 'bg-blue-700 text-white hover:bg-blue-900',
    circle: 'btn btn-circle bg-teal-400 text-white hover:bg-teal-600'
  };

  computeClasses(): string {
    // Usamos el objeto colorClasses para obtener la clase según el color
    const colorClass = this.colorClasses[this.color];
    return `${this.baseClasses} ${colorClass}`;
  }

  onClick() {
    this.clicked.emit();
  }

}

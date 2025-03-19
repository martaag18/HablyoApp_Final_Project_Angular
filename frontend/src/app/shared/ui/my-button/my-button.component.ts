import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-button',
  imports: [RouterLink, NgClass],
  templateUrl: './my-button.component.html',
  // styleUrls: ['./my-button.component.scss']
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MyButtonComponent {
  @Input() label: string = 'Click';
  @Input() color: string = 'primary';
  @Input() disabled: boolean = false;
  @Input() routerLink?: string | any[];
  @Input() buttonType: 'button' | 'submit' | 'reset' = 'button';
  @Input('aria-label') ariaLabel: string | null = null;



  
  @Output() clicked = new EventEmitter<void>();

  private readonly baseClasses = 'cursor-pointer font-bold transition-all duration-400 mt-6';

  private readonly colorClasses: { [key: string]: string } = {
    primary: 'px-4 py-4 text-xl text-white bg-primary hover:bg-[#d73232] rounded-md',
    secondary: 'px-4 py-4 text-xl text-white bg-secondary w-full hover:bg-[#2cb8a9] rounded-md',
    tertiary: 'px-4 py-4 text-xl text-white bg-tertiary hover:bg-[#d9a300] rounded-md',
    success: 'px-4 py-4 text-xl text-white bg-green-600 hover:bg-green-700 rounded-md',
    blue: 'px-4 py-4 text-xl border border-blue-800 text-blue-800 bg-transparent hover:bg-blue-900 hover:text-white rounded-md',
    blueLight: 'px-4 py-4 text-xl bg-blue-700 text-white hover:bg-blue-900 rounded-md',
    circle: 'flex items-center justify-center btn btn-circle bg-teal-400 text-white hover:bg-teal-600 w-12 h-12'
  };

  computeClasses(): string {
    const colorClass = this.colorClasses[this.color];
    return `${this.baseClasses} ${colorClass}`;
  }

  onClick() {
    this.clicked.emit();
  }

}

import { Component, ElementRef, HostListener } from '@angular/core';
import { inject } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  private elementRef = inject(ElementRef);

  isOpen = false;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  closeMenu() {
    this.isOpen = false;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.isOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}

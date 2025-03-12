import { Component, ElementRef, HostListener } from '@angular/core';
import { inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MAIN_LINKS, MOBILE_MENU_LINKS } from '../../shared/constants/navbar-links.constants';
@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  logoUrl = 'assets/Logos/hablyo_red_logo.png';
  mobileMenuLinks = MOBILE_MENU_LINKS;
  mainLinks = MAIN_LINKS;

  private elementRef = inject(ElementRef);
  private router = inject(Router);
  authService = inject(AuthService);

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.isMenuOpen && !this.elementRef.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }

  logout() {
    this.authService.logout().subscribe({
      next: (res) => {
        alert("Sesión cerrada");
        console.log('Sesión cerrada:', res.message);
        this.router.navigate([""]);
      },
      error: (err) => {
        console.error('Error al cerrar sesión:', err);
      }
    });
  }
  
}

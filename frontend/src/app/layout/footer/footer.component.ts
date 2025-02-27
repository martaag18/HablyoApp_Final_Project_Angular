import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'] // o .scss según convenga
})
export class FooterComponent {

  //Images
  logoUrl = 'assets/Logos/hablyo_red_logo.png';
  websiteUrl = 'https://www.hablyo.com/';
  email = 'info@hablyo.com';
  phone = '+34 611 190 499';
  instagramUrl = 'https://instagram.com/hablyo';
  whatsappUrl = 'https://wa.me/34611190499';

  // links
  policyLinks = [
    { label: 'Aviso Legal', url: '/aviso-legal' },
    { label: 'Política de Cookies', url: '/cookies' },
    { label: 'Política de Privacidad', url: '/privacidad' }
  ];
}


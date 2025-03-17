import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  //Images
  logoUrl = 'assets/Logos/hablyo_red_logo.png';
  websiteUrl = 'https://www.hablyo.com/';
  email = 'info@hablyo.com';
  instagramUrl = 'https://instagram.com/hablyo';

  // links
  policyLinks = [
    { label: 'Aviso Legal', url: '/aviso-legal' },
    { label: 'Política de Cookies', url: '/cookies' },
    { label: 'Política de Privacidad', url: '/privacidad' }
  ];
}


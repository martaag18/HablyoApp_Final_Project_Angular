import { Component } from '@angular/core';
import { MyButtonComponent } from '../../../shared/ui/my-button/my-button.component';

@Component({
  selector: 'app-cta',
  imports: [MyButtonComponent],
  templateUrl: './cta.component.html',
  styleUrls: ['./cta.component.css']
})
export class CTAComponent {
  
  steps = [
    {
      index: 1,
      indexColor: '#ff5757',
      color: "primary",
      title: 'Unirse al webinar',
      text: `Si todavía no has realizado el curso, únete al Webinar para conocer 
             la <strong>experiencia de Savio Mascolo</strong> en directo y descubrir 
             cómo dar tu primer paso para superar la tartamudez.`,
      link: '/webinars',
      linkText: 'Ver Webinars'
    },
    {
      index: 2,
      indexColor: '#40e0d0',
      color: "secondary",
      title: 'Registrarse',
      text: `Crea tu cuenta para acceder a los <strong>ejercicios</strong> 
             y seguir el método de Savio para hablar con mayor confianza.`,
      link: '/signup',
      linkText: 'Registrarse'
    },
    {
      index: 3,
      indexColor: '#ffcc00',
      color: "tertiary",
      title: 'Ejercicios',
      text: `Explora los <strong>ejercicios dinámicos</strong> y 
             ¡empieza a practicar para dejar atrás la tartamudez!`,
      link: '/exercices',
      linkText: 'Practicar'
    }
  ];
}

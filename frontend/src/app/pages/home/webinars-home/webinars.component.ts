import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MyButtonComponent } from '../../../shared/ui/my-button/my-button.component';

@Component({
  selector: 'app-webinars',
  imports: [RouterLink, MyButtonComponent],
  templateUrl: './webinars.component.html',
  styleUrl: './webinars.component.scss'
})
export class WebinarsHomeComponent {

  savioWebinarImg = 'assets/Images/savio_webinar.jpg';

  webinarCards = [
    {
      icon: 'fa-solid fa-video text-5xl text-yellow-400 mb-4',
      title: 'Temas del Webinar',
      items: [
        `Experiencia personal de Savio Mascolo cómo ex-tartamudo y con <strong>más de 10 años de experiencia profesional.</strong>`,
        `Presentación de su curso para dejar de tartamudear.`,
        `Técnicas y ejercicios para mejorar tu fluidez`
      ]
    },
    {
      icon: 'fa-solid fa-handshake-simple text-yellow-400 text-5xl mb-4',
      title: 'Condiciones',
      items: [
        `<strong>100% Gratis</strong> y abierto a todos`,
        `Preguntas y respuestas en vivo`,
        `Inscripción rápida, sin requisitos previos`
      ]
    }
  ];
}


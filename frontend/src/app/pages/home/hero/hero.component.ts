import { Component } from '@angular/core';
import { HeroData } from '../../../shared/interfaces/hero-data.interface';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [NgOptimizedImage],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

  heroData: HeroData = {
    title: 'TUS PALABRAS',
    highlight: 'LIBRES',
    subtitle: 'Diseñado por Savio Mascolo, ex-tartamudo.',
    benefits: [
      'Supera la tartamudez con ejercicios dinámicos.',
      'Descubre nuestros Webinars gratuitos.'
    ],
    imageSrc: 'assets/Images/hablyo_hero.jpg',
    imageAlt: 'Ejemplo de persona practicando'
  };
}

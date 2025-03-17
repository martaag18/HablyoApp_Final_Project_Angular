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
    subtitle: 'Diseñado por el logopeda Savio Mascolo, ex-tartamudo.',
    imageSrc: 'assets/Images/hablyo_hero.jpg',
    imageAlt: 'Ejemplo de persona practicando'
  };
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-cards-exercises',
  imports: [],
  templateUrl: './cards-exercises.component.html',
  styleUrl: './cards-exercises.component.scss'
})
export class CardsExercisesComponent {

  exerciseCards = [
    {
      icon: 'fas fa-microphone',
      title: 'Ejercicios de Respiración',
      items: [
        'Controla tu ritmo al hablar',
        'Reduce la tensión y la ansiedad'
      ]
    },
    {
      icon: 'fas fa-book',
      title: 'Vocal final y vocal inicial',
      items: [
        'Une vocales consecutivas sin pausas',
        'Evita interrupciones al cambiar de palabra'
      ]
    }
  ];
}

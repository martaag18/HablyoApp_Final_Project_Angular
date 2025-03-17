import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MyButtonComponent } from '../../../../shared/ui/my-button/my-button.component';
import { ExerciseCard } from '../../../../shared/interfaces/exercise-card.interface';
import { animate, style, transition, trigger } from '@angular/animations';
@Component({
  selector: 'app-exercises-index',
  imports: [RouterLink, MyButtonComponent],
  templateUrl: './exercises-index.component.html',
  styleUrl: './exercises-index.component.scss',
  animations: [
    trigger('funTitle', [
      // :enter se dispara cuando el elemento se monta en el DOM
      transition(':enter', [
        // Estado inicial (invisible y un poco arriba)
        style({ opacity: 0, transform: 'translateY(-40px)' }),
        // Transición a visible en 600ms
        animate('1500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ExercisesIndexComponent {

  exercises: ExerciseCard[] = [

    {
      title: 'Vocal final y vocal inicial',
      subtitle: 'Subraya la vocal final de una palabra y la inicial de la siguiente',
      image: 'assets/Images/savio_webinar.jpg',
      route: 'vocal-home'
    },
    {
      title: 'Doble Vocal',
      subtitle: 'Ejercicios para mejorar la pronunciación de vocales dobles',
      image: 'assets/Images/savio_webinar.jpg',
      route: 'doble-vocal-home'
    },
    {
      title: 'R con consonante',
      subtitle: 'Mejora la pronunciación de “R” precedida de consonante',
      image: 'assets/Images/savio_webinar.jpg',
      route: 'r-por-consonante'
    },
  ];
}

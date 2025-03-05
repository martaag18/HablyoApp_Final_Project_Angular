import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MyButtonComponent } from '../../../../shared/ui/my-button/my-button.component';


interface ExerciseCard {
  title: string;
  subtitle: string;
  image: string;
  route: string; // Ruta relativa dentro de la sección ejercicios
}

@Component({
  selector: 'app-exercises-index',
  imports: [CommonModule, RouterLink, MyButtonComponent],
  templateUrl: './exercises-index.component.html',
  styleUrl: './exercises-index.component.scss'
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

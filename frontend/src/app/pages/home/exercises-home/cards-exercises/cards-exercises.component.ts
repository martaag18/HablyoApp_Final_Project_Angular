import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-cards-exercises',
  imports: [RouterLink],
  templateUrl: './cards-exercises.component.html',
  // styleUrls: ['./cards-exercises.component.scss']
})
export class CardsExercisesComponent {

  authService = inject(AuthService);

  exerciseCards = [
    {
      level: 1,
      title: 'Vocal Final - Vocal Inicial',
      route: 'vocal-home'
    },
    {
      level: 2,
      title: 'Doble Vocal',
      route: 'doble-vocal-home'
    },
    {
      level: 3,
      title: '“R” Precedida Por Consonante',
      route: 'r-por-consonante'
    }
  ];

  getCardRoute(card: { route:string; level:number }):string[]{
    if(!this.authService.isLoggedSignal()){
      return ['/login'];
    }else {
      return ['/ejercicios', card.route];
    }
  }
}

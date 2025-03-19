// exercises.routes.ts
import { Routes } from '@angular/router';

export const EXERCISES_ROUTES: Routes = [
  {
    // Al ir a /ejercicios, muestra ExercisesIndexComponent
    path: '',
    loadComponent: () =>
      import('./components/exercises-index/exercises-index.component').then(
        (c) => c.ExercisesIndexComponent
      ),
  },
  {
    path: 'vocal-final-inicial-explicacion',
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './components/exercise-1/exercise-1-explanation/exercise-1-explanation.component'
          ).then((c) => c.Exercise1ExplanationComponent),
      },
      {
        path: 'vocal-final-inicial-practica',
        loadComponent: () =>
          import(
            './components/exercise-1/exercise-1-container/exercise-container.component'
          ).then((c) => c.Exercise1ContainerComponent),
      },
    ],
  },
  {
    path: 'doble-vocal-explicacion',
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './components/exercise-2/exercise-2-explanation/exercise-2-explanation.component'
          ).then((c) => c.Exercise2ExplanationComponent),
      },
      {
        path: 'doble-vocal-practica',
        loadComponent: () =>
          import(
            './components/exercise-2/exercise-2-container/exercise-2-container.component'
          ).then((c) => c.ExerciseDobleVocalContainerComponent),
      },
    ],
  },
];

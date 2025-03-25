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
    data: { animation: 'ExerciseIndex' },
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
        data: { animation: 'Exercise1Explanation' },
      },
      {
        path: 'vocal-final-inicial-practica',
        loadComponent: () =>
          import(
            './components/exercise-1/exercise-1-container/exercise-container.component'
          ).then((c) => c.Exercise1ContainerComponent),
        data: { animation: 'Exercise1Practice' },
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
        data: { animation: 'Exercise2Explanation' },
      },
      {
        path: 'doble-vocal-practica',
        loadComponent: () =>
          import(
            './components/exercise-2/exercise-2-container/exercise-2-container.component'
          ).then((c) => c.Exercise2ContainerComponent),
        data: { animation: 'Exercise2Practice' },
      },
    ],
  },
  {
    path: 'r-prececida-por-consonante-explicacion',
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './components/exercise-3/exercise-3-explanation/exercise-3-explanation.component'
          ).then((c) => c.Exercise3ExplanationComponent),
        data: { animation: 'Exercise3Explanation' },
      },
      {
        path: 'r-prececida-por-consonante-practica',
        loadComponent: () =>
          import(
            './components/exercise-3/exercise-3-container/exercise-3-container.component'
          ).then((c) => c.Exercise3ContainerComponent),
        data: { animation: 'Exercise3Practice' },
      },
    ],
  },
];

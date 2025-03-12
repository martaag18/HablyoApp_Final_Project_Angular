import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Ruta raíz -> redirige a /home
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full', //ruta solo coincide si URL coincide exactamente con el path indicado
  },

  // Layout principal con children
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then((m) => m.LayoutComponent),
    children: [
      // Rutas planas
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/auth/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
      {
        path: 'registro-usuario',
        loadComponent: () =>
          import('./pages/auth/register/register.component').then(
            (c) => c.RegisterComponent
          ),
      },

      // Ejercicios -> children
      {
        path: 'ejercicios',
        children: [
          {
            // /ejercicios => ExercisesIndexComponent
            path: '',
            loadComponent: () =>
              import(
                './pages/exercises/components/exercises-index/exercises-index.component'
              ).then((c) => c.ExercisesIndexComponent),
          },
          {
            // /ejercicios/vocal-home
            path: 'vocal-home',
            loadComponent: () =>
              import(
                './pages/exercises/components/exercise-vocal/exercise-vocal-home/vocal-home.component'
              ).then((c) => c.VocalHomeComponent),
          },
          {
            path: 'vocal-final-vocal-inicial',
            loadComponent: () =>
              import(
                './pages/exercises/components/exercise-vocal/exercise-vocal-container/exercise-container.component'
              ).then((c) => c.ExerciseContainerComponent),
          },
          {
            path: 'doble-vocal-home',
            loadComponent: () =>
              import(
                './pages/exercises/components/exercise-doble-vocal/exercise-doble-vocal-home/exercise-doble-vocal-home.component'
              ).then((c) => c.ExerciseDobleVocalHomeComponent),
          },
          {
            path: 'doble-vocal',
            loadComponent: () =>
              import(
                "./pages/exercises/components/exercise-doble-vocal/exercise-doble-vocal-container/exercise-doble-vocal-container.component"
              ).then((c) => c.ExerciseDobleVocalContainerComponent),
          },
        ],
      },
    ],
  },
];

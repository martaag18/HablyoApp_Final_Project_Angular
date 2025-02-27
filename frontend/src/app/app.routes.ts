import { Routes } from '@angular/router';

export const routes: Routes = [
  // Ruta raíz -> redirige a /home
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
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
          import('./pages/auth/login/login.component').then((c) => c.LoginComponent),
      },
      {
        path: 'registro-usuario',
        loadComponent: () =>
          import('./pages/auth/register/register.component').then((c) => c.RegisterComponent),
      },

      // Webinars -> children
      {
        path: 'webinars',
        children: [
          {
            path: '',
            loadComponent: () =>
              import('./pages/webinars/upcoming-webinars/upcoming-webinars.component')
                .then((c) => c.UpcomingWebinarsComponent),
          },
          {
            path: 'registro-webinar',
            loadComponent: () =>
              import('./pages/webinars/webinar-signup/webinar-signup.component')
                .then((c) => c.WebinarSignupComponent),
          },
        ],
      },

      // Ejercicios -> children
      {
        path: 'ejercicios',
        children: [
          {
            // /ejercicios => ExercisesIndexComponent
            path: '',
            loadComponent: () =>
              import('./pages/exercises/components/exercises-index/exercises-index.component')
                .then((c) => c.ExercisesIndexComponent),
          },
          {
            // /ejercicios/vocal-home
            path: 'vocal-home',
            loadComponent: () =>
              import('./pages/exercises/components/exercise-vocal/exercise-vocal-home/vocal-home.component')
                .then((c) => c.VocalHomeComponent),
          },
          {
            path: 'vocal-final-vocal-inicial',
            loadComponent: () =>
              import('./pages/exercises/components/exercise-vocal/exercise-vocal-container/exercise-container.component')
                .then((c) => c.ExerciseContainerComponent),
          },
        ],
      },
    ],
  },
];

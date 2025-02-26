import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then(c => c.HomeComponent),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/auth/register/register.component').then(c => c.RegisterComponent),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/auth/login/login.component').then(c => c.LoginComponent),
      },
      {
        path: 'webinars',
        loadComponent: () =>
          import('./pages/webinars/upcoming-webinars/upcoming-webinars.component').then(c => c.UpcomingWebinarsComponent),
      },
      {
        path: 'webinar-signup',
        loadComponent: () =>
          import('./pages/webinars/webinar-signup/webinar-signup.component').then(c => c.WebinarSignupComponent),
      },
      {
        path: 'exercise',
        loadComponent: () =>
          import('./pages/exercises/components/exercise-container/exercise-container.component')
            .then(c => c.ExerciseContainerComponent),
      },
    ]
  },
];


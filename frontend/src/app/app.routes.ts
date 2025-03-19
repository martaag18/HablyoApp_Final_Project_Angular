import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { EXERCISES_ROUTES } from './pages/exercises/exercises.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full', //ruta solo coincide si URL coincide exactamente con el path indicado
  },

  {
    path: '',
    loadComponent: () =>
      import('./layout/layout.component').then((m) => m.LayoutComponent),
    children: [
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
        children: EXERCISES_ROUTES,
      },
    ],
  },
];

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
        data: { animation: 'HomePage' },
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/auth/login/login.component').then(
            (c) => c.LoginComponent
          ),
        data: { animation: 'LoginPage' },
      },
      {
        path: 'registro-usuario',
        loadComponent: () =>
          import('./pages/auth/register/register.component').then(
            (c) => c.RegisterComponent
          ),
        data: { animation: 'RegisterPage' },
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./pages/auth/forgot-password/forgot-password.component').then(
            (c) => c.ForgotPasswordComponent
          ),
        data: { animation: 'ForgotPasswordPage' }
      },
      {
        path: 'reset-password',
        loadComponent: () =>
          import('./pages/auth/reset-password/reset-password.component').then(
            (m) => m.ResetPasswordComponent
          ),
        data: { animation: 'ResetPasswordPage' }
      },
      {
        path: 'politica-privacidad',
        loadComponent: () =>
          import('./pages/legal-pages/privacy-policy/privacy-policy.component').then(
            (m) => m.PrivacyPolicyComponent
          ),
        data: { animation: 'PrivacyPolicyPage' }
      },
      {
        path: 'aviso-legal',
        loadComponent: () =>
          import('./pages/legal-pages/legal-notice/legal-notice.component').then(
            (m) => m.LegalNoticeComponent
          ),
        data: { animation: 'LegalNoticePage' }
      },
      {
        path: 'politica-cookies',
        loadComponent: () =>
          import('./pages/legal-pages/cookie-policy/cookie-policy.component').then(
            (m) => m.CookiePolicyComponent
          ),
        data: { animation: 'ResetPasswordPage' }
      },

      // Ejercicios -> children
      {
        path: 'ejercicios',
        canActivate: [AuthGuard],
        data: { animation: 'EjerciciosPage' }, 
        children: EXERCISES_ROUTES,
      },
      // Ejercicios -> not found page

      { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent) }

    ],
  },
];

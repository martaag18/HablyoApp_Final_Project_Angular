import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { UpcomingWebinarsComponent } from './pages/webinars/upcoming-webinars/upcoming-webinars.component';
import { WebinarSignupComponent } from './pages/webinars/webinar-signup/webinar-signup.component';

export const routes: Routes = [
    { path: "", component: HomeComponent},
    { path: "register", component: RegisterComponent},
    { path: "login", component: LoginComponent},
    { path: "webinars", component: UpcomingWebinarsComponent},
    { path: "webinar-signup", component: WebinarSignupComponent},
  {
    path: 'exercise',
    loadComponent: () =>
      import('./pages/exercises/components/exercise-container/exercise-container.component').then(
        m => m.ExerciseContainerComponent
      ),
  },

];

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ExercicesComponent } from './pages/exercices/exercices.component';
import { UpcomingWebinarsComponent } from './pages/webinars/upcoming-webinars/upcoming-webinars.component';
import { WebinarSignupComponent } from './pages/webinars/webinar-signup/webinar-signup.component';

export const routes: Routes = [
    { path: "", component: HomeComponent},
    { path: "register", component: RegisterComponent},
    { path: "login", component: LoginComponent},
    { path: "exercices", component: ExercicesComponent},
    { path: "webinars", component: UpcomingWebinarsComponent},
    { path: "webinar-signup", component: WebinarSignupComponent},

];

import { Component } from '@angular/core';
import { ReviewsComponent } from './reviews/reviews.component';
import { ExercisesHomeComponent } from './exercises-home/exercises.component';
import { WebinarsHomeComponent } from './webinars-home/webinars.component';
import { HeroComponent } from "./hero/hero.component";
import { CTAComponent } from './cta/cta.component';
@Component({
  selector: 'app-home',
  imports: [ReviewsComponent, ExercisesHomeComponent, WebinarsHomeComponent, HeroComponent, CTAComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

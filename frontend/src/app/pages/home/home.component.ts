import { Component } from '@angular/core';
import { ReviewsComponent } from './reviews/reviews.component';
import { ExercisesHomeComponent } from './exercises-home/exercises.component';
import { HeroComponent } from "./hero/hero.component";
import { MotivationalSectionComponent } from './motivational-section/motivational-section.component';
@Component({
  selector: 'app-home',
  imports: [ReviewsComponent, ExercisesHomeComponent, HeroComponent, MotivationalSectionComponent],
  templateUrl: './home.component.html',
  // styleUrl: './home.component.scss'
})
export class HomeComponent {

}

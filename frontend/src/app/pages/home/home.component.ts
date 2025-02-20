import { Component } from '@angular/core';
import { ReviewsComponent } from './reviews/reviews.component';
import { ExercicesComponent } from './exercices/exercices.component';
import { WebinarsComponent } from './webinars/webinars.component';
import { HeroComponent } from "./hero/hero.component";
@Component({
  selector: 'app-home',
  imports: [ReviewsComponent, ExercicesComponent, WebinarsComponent, HeroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}

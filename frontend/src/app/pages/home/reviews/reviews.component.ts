import { Component } from '@angular/core';
import { REVIEWS } from './data/reviews.mock';
import { NgClass } from '@angular/common';
import { Review } from '../../../shared/interfaces/review.interface';
import { MyButtonComponent } from '../../../shared/ui/my-button/my-button.component';

@Component({
  selector: 'app-reviews',
  imports: [NgClass,MyButtonComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {

  reviews: Review[] = REVIEWS;

  currentIndex = 0;

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  next() {
    if (this.currentIndex < this.reviews.length - 1) {
      this.currentIndex++;
    }
  }

}

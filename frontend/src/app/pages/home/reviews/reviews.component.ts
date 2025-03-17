import { Component, computed, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { MyButtonComponent } from '../../../shared/ui/my-button/my-button.component';
import { REVIEWS } from './data/reviews.mock';
import { Review } from '../../../shared/interfaces/review.interface';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [NgClass, MyButtonComponent],
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent {
  
  reviews = signal<Review[]>(REVIEWS);
  currentIndex = signal<number>(0)


  visibleIndexes = computed<number[]>(() => [
    this.currentIndex() - 1,
    this.currentIndex(),
    this.currentIndex() + 1
  ]);

  getPositionClass(index: number): string {
    const current = this.currentIndex();
    if (index === current) return 'carousel-center';
    if (index === current - 1) return 'carousel-left';
    if (index === current + 1) return 'carousel-right';
    return '';
  }

  prev(): void {
    if (this.currentIndex() > 0) {
      this.currentIndex.update(value => value - 1);
    }
  }

  next(): void {
    if (this.currentIndex() < this.reviews().length - 1) {
      this.currentIndex.update(value => value + 1);
    }
  }
}
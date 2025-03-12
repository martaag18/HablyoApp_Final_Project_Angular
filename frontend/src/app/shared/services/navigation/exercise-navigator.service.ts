import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExerciseNavigatorService {
 
  currentIndex = signal(0);

  next(totalExercises: number) {
    const idx = this.currentIndex();
    if (idx < totalExercises - 1) {
      this.currentIndex.update(value => value + 1);
    }
  }

  previous() {
    const idx = this.currentIndex();
    if (idx > 0) {
      this.currentIndex.update(value => value - 1);
    }
  }
}

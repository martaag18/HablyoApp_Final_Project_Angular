import { Injectable } from '@angular/core';
import { ValidationState } from '../../types/validation-state.type';

@Injectable({
  providedIn: 'root'
})
export class CircleService {
  constructor() {}

  /**
   * Validates the 'Circle' mark based on whether specific indices are expected to have 'Circle'.
   * If circleIndices is not provided, a simpler logic is used:
   * - 'Circle' => 'correct'
   * - otherwise => null
   */
  validateCircle(
    circleMark: Array<'none' | 'circle'>,
    circleIndices?: number[]
  ): ValidationState[] {
    const result: ValidationState[] = [];

    for (let i = 0; i < circleMark.length; i++) {
      const mark = circleMark[i];

      if (!circleIndices) {
        // Simple logic: if user placed 'Circle' => 'correct', otherwise => null
        result[i] = (mark === 'circle') ? 'correct' : null;
      } else {
        // Logic when pIndices is provided
        const isExpected = circleIndices.includes(i);
        if (isExpected) {
          if (mark === 'circle') {
            result[i] = 'correct';
          } else {
            // 'Circle' was expected but not placed
            result[i] = 'missed';
          }
        } else {
          // 'Circle' was not expected here
          if (mark === 'circle') {
            result[i] = 'wrong'; // 'Circle' placed incorrectly
          } else {
            result[i] = null;
          }
        }
      }
    }

    return result;
  }
}

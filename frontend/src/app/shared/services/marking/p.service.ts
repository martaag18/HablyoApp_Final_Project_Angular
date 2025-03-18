import { Injectable } from '@angular/core';
import { ValidationState } from '../../types/validation-state.type';

@Injectable({
  providedIn: 'root'
})
export class PService {
  constructor() {}

  /**
   * Validates the 'P' mark based on whether specific indices are expected to have 'P'.
   * If pIndices is not provided, a simpler logic is used:
   * - 'P' => 'correct'
   * - otherwise => null
   */
  validateP(
    pMark: Array<'none' | 'P'>,
    pIndices?: number[]
  ): ValidationState[] {
    const result: ValidationState[] = [];

    for (let i = 0; i < pMark.length; i++) {
      const mark = pMark[i];

      if (!pIndices) {
        // Simple logic: if user placed 'P' => 'correct', otherwise => null
        result[i] = (mark === 'P') ? 'correct' : null;
      } else {
        // Logic when pIndices is provided
        const isExpected = pIndices.includes(i);
        if (isExpected) {
          if (mark === 'P') {
            result[i] = 'correct';
          } else {
            // 'P' was expected but not placed
            result[i] = 'missed';
          }
        } else {
          // 'P' was not expected here
          if (mark === 'P') {
            result[i] = 'wrong'; // 'P' placed incorrectly
          } else {
            result[i] = null;
          }
        }
      }
    }

    return result;
  }
}

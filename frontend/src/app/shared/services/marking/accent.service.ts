import { Injectable } from '@angular/core';
import { ValidationState } from '../../types/validation-state.type';

@Injectable({
  providedIn: 'root'
})
export class AccentService {

  /**
   * Validates the accent marks ('´') based on whether specific indices are expected to have a accent.
   * If accentIndices is not provided, a simpler logic is applied:
   * - '´' => 'correct'
   * - otherwise => null
   */
  validateAccents(
    accentMark: Array<'none' | '´'>,
    accentIndices?: number[]
  ): ValidationState[] {
    const result: ValidationState[] = [];

    for (let i = 0; i < accentMark.length; i++) {
      const mark = accentMark[i];

      if (!accentIndices) {
        // Simple logic: if user placed '´' => 'correct', otherwise => null
        result[i] = (mark === '´') ? 'correct' : null;
      } else {
        // Logic when accentIndices is provided
        const isExpected = accentIndices.includes(i);
        if (isExpected) {
          if (mark === '´') {
            result[i] = 'correct';
          } else {
            // accent was expected but not placed
            result[i] = 'missed';
          }
        } else {
          // Accent was not expected here
          if (mark === '´') {
            result[i] = 'wrong'; // accent placed incorrectly
          } else {
            result[i] = null;
          }
        }
      }
    }

    return result;
  }
}

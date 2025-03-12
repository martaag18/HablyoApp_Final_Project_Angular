import { Injectable } from '@angular/core';
import { ValidationState } from '../../types/validation-state.type';
@Injectable({
  providedIn: 'root'
})
export class UnderlineService {

  validateUnderlines(
    vdobleIndices: number[],
    underlineMark: Array<'none' | 'underline'>
  ): ValidationState[] {
    const result: ValidationState[] = [];
    const total = underlineMark.length;
    for (let i = 0; i < total; i++) {
      const mark = underlineMark[i];
      const isExpected = vdobleIndices.includes(i);
      if (isExpected) {
        result[i] = (mark === 'underline') ? 'correct' : 'missed';
      } else {
        result[i] = (mark === 'underline') ? 'wrong' : null;
      }
    }
    return result;
  }

  
}

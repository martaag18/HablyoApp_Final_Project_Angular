// Validate if the arcs placed by the user between words are correct or not.
import { Injectable } from '@angular/core';
import { WordItem } from '../../interfaces/word-item.interface';
import { ValidationState } from '../../types/validation-state.type';

@Injectable({
  providedIn: 'root'
})
export class ArcService {

  validateArcs(wordList: WordItem[], arcMark: Array<'none' | 'arc'>): ValidationState[] {
    const result: ValidationState[] = [];

    for (let i = 0; i < arcMark.length; i++) {
      if (arcMark[i] === 'arc') { 
        // If the user placed an arc and the word item actually needs an arc
        if (wordList[i].arcToNext) {
          result[i] = 'correct';
        } else {
          result[i] = 'wrong';
        }
      } else {
        // If the user did not place an arc, but the word item requires it
        if (wordList[i].arcToNext) {
          result[i] = 'missed';
        } else {
          result[i] = null;
        }
      }
    }

    return result;
  }
}

import { Injectable } from '@angular/core';
import { WordItem } from '../../shared/interfaces/word-item.interface';

export type ValidationState = 'correct' | 'wrong' | 'missed' | null;

@Injectable({
  providedIn: 'root'
})
export class ArcService {
  constructor() {}

  /**
   * Valida los arcos entre palabras.
   * - arcMark[i] = 'arc' si el usuario colocó puente entre palabra i e i+1
   * - wordList[i].arcToNext = true si realmente hay vocal final - vocal inicial
   */
  validateArcs(wordList: WordItem[], arcMark: Array<'none' | 'arc'>): ValidationState[] {
    const result: ValidationState[] = [];

    for (let i = 0; i < arcMark.length; i++) {
      if (arcMark[i] === 'arc') {
        // El usuario puso un arco
        if (wordList[i].arcToNext) {
          result[i] = 'correct'; // verde
        } else {
          result[i] = 'wrong';   // rojo
        }
      } else {
        // arcMark[i] === 'none'
        if (wordList[i].arcToNext) {
          result[i] = 'missed';  // amarillo
        } else {
          result[i] = null;      // sin marca
        }
      }
    }
    return result;
  }
}

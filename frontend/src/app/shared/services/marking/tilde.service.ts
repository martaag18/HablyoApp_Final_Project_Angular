import { Injectable } from '@angular/core';
import { ValidationState } from '../../types/validation-state.type';

@Injectable({
  providedIn: 'root'
})
export class TildeService {


  validateTildes(
    tildeMark: Array<'none' | '´'>,
    tildeIndices?: number[]
  ): ValidationState[] {
    const result: ValidationState[] = [];

    for (let i = 0; i < tildeMark.length; i++) {
      const mark = tildeMark[i];

      if (!tildeIndices) {
        // Lógica simple: si puso tilde => 'correct', sino => null
        result[i] = (mark === '´') ? 'correct' : null;
      } else {
        // Lógica con tildeIndices
        const isExpected = tildeIndices.includes(i);
        if (isExpected) {
          if (mark === '´') {
            result[i] = 'correct';
          } else {
            // faltó tilde
            result[i] = 'missed';
          }
        } else {
          // No se esperaba tilde aquí
          if (mark === '´') {
            result[i] = 'wrong'; // tilde mal puesta
          } else {
            result[i] = null;
          }
        }
      }
    }

    return result;
  }
}

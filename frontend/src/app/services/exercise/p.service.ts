import { Injectable } from '@angular/core';

export type ValidationState = 'correct' | 'wrong' | 'missed' | null;

@Injectable({
  providedIn: 'root'
})
export class PService {
  constructor() {}

  validateP(
    pMark: Array<'none' | 'P'>,
    pIndices?: number[]
  ): ValidationState[] {
    const result: ValidationState[] = [];

    for (let i = 0; i < pMark.length; i++) {
      const mark = pMark[i];

      if (!pIndices) {
        // Lógica simple: si puso P => 'correct', sino => null
        result[i] = (mark === 'P') ? 'correct' : null;
      } else {
        // Lógica con pIndices
        const isExpected = pIndices.includes(i);
        if (isExpected) {
          if (mark === 'P') {
            result[i] = 'correct';
          } else {
            // faltó la marca 'P'
            result[i] = 'missed';
          }
        } else {
          // No se esperaba P aquí
          if (mark === 'P') {
            result[i] = 'wrong'; // 'P' mal puesta
          } else {
            result[i] = null;
          }
        }
      }
    }

    return result;
  }
}

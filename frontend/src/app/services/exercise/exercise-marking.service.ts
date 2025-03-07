import { Injectable, inject } from '@angular/core';
import { ArcService, ValidationState as ArcValidation } from './arc.service';
import { TildeService, ValidationState as TildeValidation } from './tilde.service';
import { PService } from './p.service';
import { UnderlineService } from './underline.service'; // Inyectamos UnderlineService
import { WordItem } from '../../shared/interfaces/word-item.interface';

// Mantén el alias si necesitas un ValidationState genérico
export type ValidationState = 'correct' | 'wrong' | 'missed' | null;

@Injectable({
  providedIn: 'root',
})
export class ExerciseMarkingService {
  private arcService = inject(ArcService);
  private tildeService = inject(TildeService);
  private pService = inject(PService);
  private underlineService = inject(UnderlineService); // Inyectamos UnderlineService

  // =============== ARC ===============
  /**
   * Valida arcMark => delega a ArcService
   */
  validateArcs(
    wordList: WordItem[],
    arcMark: Array<'none' | 'arc'>
  ): ValidationState[] {
    return this.arcService.validateArcs(wordList, arcMark);
  }

  // =============== TILDE ===============
  /**
   * Valida tildeMark => delega a TildeService
   * Recibe tildeMark y, opcionalmente, tildeIndices
   */
  validateTildes(
    tildeMark: Array<'none' | '´'>,
    tildeIndices?: number[]
  ): ValidationState[] {
    return this.tildeService.validateTildes(tildeMark, tildeIndices);
  }

  // =============== P ===============
  /**
   * Valida la marca "P" => delega a PService
   */
  validateP(
    wordList: WordItem[],
    pMark: Array<'none' | 'P'>,
    pIndices?: number[]
  ): ValidationState[] {
    return this.pService.validateP(pMark, pIndices);
  }

  // =============== UNDERLINE ===============
  /**
   * Valida el subrayado (underline) usando los índices de las vocales dobles (vdobleIndices).
   * Para cada posición del array underlineMark se evalúa:
   * - Si se esperaba subrayado (el índice está en vdobleIndices):
   *      Si hay 'underline' => 'correct'
   *      Si no => 'missed'
   * - Si no se esperaba subrayado:
   *      Si hay 'underline' => 'wrong'
   *      Sino => null
   */
  validateUnderlines(
    vdobleIndices: number[],
    underlineMark: Array<'none' | 'underline'>
  ): ValidationState[] {
    const result: ValidationState[] = [];
    for (let i = 0; i < underlineMark.length; i++) {
      const mark = underlineMark[i];
      const isExpected = vdobleIndices.includes(i);
      if (isExpected) {
        // Se esperaba subrayado
        if (mark === 'underline') {
          result[i] = 'correct';
        } else {
          result[i] = 'missed';
        }
      } else {
        // No se esperaba subrayado
        if (mark === 'underline') {
          result[i] = 'wrong';
        } else {
          result[i] = null;
        }
      }
    }
    return result;
  }
  

  // =============== GENERATE SOLUTION ===============
  /**
   * Genera la "solución" automática:
   * - arcMark => si arcToNext = true => 'arc'
   * - tildeMark => coloca '´' en los índices de tildeIndices
   * - pMark => coloca 'P' en pIndices
   * - underlineMark => coloca 'underline' en cada índice de vocales dobles (vdobleIndices)
   */
  generateSolution(
    wordList: WordItem[],
    vdobleIndices: number[],
    tildeIndices?: number[],
    pIndices?: number[]
  ): {
    arcMark: Array<'none' | 'arc'>;
    tildeMark: Array<'none' | '´'>;
    pMark: Array<'none' | 'P'>;
    underlineMark: Array<'none' | 'underline'>;
  } {
    // =========== ARC ===========
    const arcMark = wordList
      .map((w) => w.arcToNext)
      .slice(0, -1)
      .map((flag) => (flag ? 'arc' : 'none'));

    // =========== TILDE ===========
    const totalLetters = wordList.reduce((acc, w) => acc + w.letters.length, 0);
    const tildeMark = Array<'none' | '´'>(totalLetters).fill('none');
    if (tildeIndices) {
      for (const idx of tildeIndices) {
        if (idx >= 0 && idx < totalLetters) {
          tildeMark[idx] = '´';
        }
      }
    }

    // =========== P ===========
    const pMark = Array<'none' | 'P'>(totalLetters).fill('none');
    if (pIndices) {
      for (const idx of pIndices) {
        if (idx >= 0 && idx < totalLetters) {
          pMark[idx] = 'P';
        }
      }
    }

    // =========== UNDERLINE ===========
    const underlineMark = Array<'none' | 'underline'>(totalLetters).fill('none');
    for (const index of vdobleIndices) {
      if (index >= 0 && index < totalLetters) {
        underlineMark[index] = 'underline';
      }
    }

    return { arcMark, tildeMark, pMark, underlineMark };
  }

  private isVowel(ch: string): boolean {
    return 'aeiouáéíóú'.includes(ch.toLowerCase());
  }
}

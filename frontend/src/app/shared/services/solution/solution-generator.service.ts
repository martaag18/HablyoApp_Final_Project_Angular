import { Injectable } from '@angular/core';
import { WordItem } from '../../interfaces/word-item.interface';

/**
 * Generates the "solution" for a given exercise, indicating where arcs, accents, 'P', or underline marks
 * should be placed based on the provided indices and word list.
 */
@Injectable({ providedIn: 'root' })
export class SolutionGeneratorService {

  /**
   * Builds the final set of marks (arc, accent, P, underline) that represent the correct solution.
   * @param wordList - The array of WordItem objects representing the words in the exercise.
   * @param vdobleIndices - The indices where underline marks should appear.
   * @param accentIndices - Optional indices where accents ('´') should appear.
   * @param pIndices - Optional indices where 'P' should appear.
   * @param circleIndices - Optional indices where 'circle' should appear.
   * @returns An object with arrays for arcMark, accentMark, pMark, and underlineMark.
   */
  generateSolution(
    wordList: WordItem[],
    vdobleIndices: number[],
    accentIndices?: number[],
    pIndices?: number[],
    circleIndices?: number[]

  ): {
    arcMark: Array<'none' | 'arc'>;
    accentMark: Array<'none' | '´'>;
    pMark: Array<'none' | 'P'>;
    underlineMark: Array<'none' | 'underline'>;
    circleMark: Array<'none' | 'circle'>;

  } {
    const totalLetters = wordList.reduce((acc, w) => acc + w.letters.length, 0);

    const arcMark = this.generateArcMark(wordList);
    const accentMark = this.generateAccentMark(totalLetters, accentIndices);
    const pMark = this.generatePMark(totalLetters, pIndices);
    const underlineMark = this.generateUnderlineMark(totalLetters, vdobleIndices);
    const circleMark = this.generateCircleMark(totalLetters, circleIndices);


    return { arcMark, accentMark, pMark, underlineMark, circleMark };
  }

  /**
   * Generates the arcMark array based on the arcToNext flag in each WordItem.
   */
  private generateArcMark(wordList: WordItem[]): Array<'none' | 'arc'> {
    return wordList
      .map((w) => w.arcToNext)
      .slice(0, -1)
      .map((flag) => (flag ? 'arc' : 'none'));
  }

  /**
   * Generates the accentMark array based on the expected accent indices.
   */
  private generateAccentMark(
    totalLetters: number,
    accentIndices?: number[]
  ): Array<'none' | '´'> {
    const accentMark = Array<'none' | '´'>(totalLetters).fill('none');
    if (accentIndices) {
      for (const idx of accentIndices) {
        if (idx >= 0 && idx < totalLetters) {
          accentMark[idx] = '´';
        }
      }
    }
    return accentMark;
  }

  /**
   * Generates the pMark array based on the expected P indices.
   */
  private generatePMark(
    totalLetters: number,
    pIndices?: number[]
  ): Array<'none' | 'P'> {
    const pMark = Array<'none' | 'P'>(totalLetters).fill('none');
    if (pIndices) {
      for (const idx of pIndices) {
        if (idx >= 0 && idx < totalLetters) {
          pMark[idx] = 'P';
        }
      }
    }
    return pMark;
  }

  /**
   * Generates the underlineMark array based on the expected vdobleIndices.
   */
  private generateUnderlineMark(
    totalLetters: number,
    vdobleIndices: number[]
  ): Array<'none' | 'underline'> {
    const underlineMark = Array<'none' | 'underline'>(totalLetters).fill('none');
    for (const index of vdobleIndices) {
      if (index >= 0 && index < totalLetters) {
        underlineMark[index] = 'underline';
      }
    }
    return underlineMark;
  }

  /**
   * Generates the circleMark array based on the expected circleIndices.
   */
    private generateCircleMark(
      totalLetters: number,
      circleIndices?: number[]
    ): Array<'none' | 'circle'> {
      const circleMark = Array<'none' | 'circle'>(totalLetters).fill('none');
      if (circleIndices) {
        for (const idx of circleIndices) {
          if (idx >= 0 && idx < totalLetters) {
            circleMark[idx] = 'circle';
          }
        }
      }
      return circleMark;
    }
}

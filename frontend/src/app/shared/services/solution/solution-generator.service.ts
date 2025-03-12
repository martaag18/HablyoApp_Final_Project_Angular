import { Injectable } from '@angular/core';
import { WordItem } from '../../interfaces/word-item.interface';

@Injectable({ providedIn: 'root' })
export class SolutionGeneratorService {

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
    const totalLetters = wordList.reduce((acc, w) => acc + w.letters.length, 0);

    const arcMark = this.generateArcMark(wordList);
    const tildeMark = this.generateTildeMark(totalLetters, tildeIndices);
    const pMark = this.generatePMark(totalLetters, pIndices);
    const underlineMark = this.generateUnderlineMark(totalLetters, vdobleIndices);

    return { arcMark, tildeMark, pMark, underlineMark };
  }


  //Genera array de archMarc basándose en arcToNext en cada WordItem
  private generateArcMark(wordList: WordItem[]): Array<'none' | 'arc'> {
    return wordList
      .map((w) => w.arcToNext)
      .slice(0, -1)
      .map((flag) => (flag ? 'arc' : 'none'));
  }


  //Genera el array de tildeMarc con base en los índices esperados de tilde.
  private generateTildeMark(totalLetters: number, tildeIndices?: number[]): Array<'none' | '´'> {
    const tildeMark = Array<'none' | '´'>(totalLetters).fill('none');
    if (tildeIndices) {
      for (const idx of tildeIndices) {
        if (idx >= 0 && idx < totalLetters) {
          tildeMark[idx] = '´';
        }
      }
    }
    return tildeMark;
  }

  //Genera el array de pMark con base en los ídices esperados de P.
  private generatePMark(totalLetters: number, pIndices?: number[]): Array<'none' | 'P'> {
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

  //Genera el array de underlineMarck con base a los índices esperados (vdobleIndices)
  private generateUnderlineMark(totalLetters: number, vdobleIndices: number[]): Array<'none' | 'underline'> {
    const underlineMark = Array<'none' | 'underline'>(totalLetters).fill('none');
    for (const index of vdobleIndices) {
      if (index >= 0 && index < totalLetters) {
        underlineMark[index] = 'underline';
      }
    }
    return underlineMark;
  }
}

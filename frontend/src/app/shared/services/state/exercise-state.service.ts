// Manages the state of an exercise using Signals
import { Injectable, signal } from '@angular/core';
import { WordItem } from '../../interfaces/word-item.interface';
import { ValidationState } from '../../types/validation-state.type';

@Injectable({ providedIn: 'root' })
export class ExerciseStateService {

  // Word list (and letters) for the exercise
  wordList = signal<WordItem[]>([]);

  // Arrays indicating which marks the user has placed.
  // Each position corresponds to a letter (accent, P, underline) or an arc between words.
  accentMark = signal<Array<'none' | '´'>>([]);
  arcMark = signal<Array<'none' | 'arc'>>([]);
  pMark = signal<Array<'none' | 'P'>>([]);
  underlineMark = signal<Array<'none' | 'underline'>>([]);
  circleMark = signal<Array<'none' | 'circle'>>([]);

  // Arrays holding the validation result for each mark.
  resultAccent = signal<ValidationState[]>([]);
  resultArc = signal<ValidationState[]>([]);
  resultP = signal<ValidationState[]>([]);
  resultUnderline = signal<ValidationState[]>([]);
  resultCircle = signal<ValidationState[]>([]);


  /**
   * Prepares the accent arrays (mark and result) based on the total number of letters.
   */
  private initializeAccentState(wordList: WordItem[]): {
    accentMark: Array<'none' | '´'>;
    resultAccent: ValidationState[];
  } {
    const totalLetters = wordList.reduce((acc, w) => acc + w.letters.length, 0);
    return {
      accentMark: Array<'none' | '´'>(totalLetters).fill('none'),
      resultAccent: Array<ValidationState>(totalLetters).fill(null)
    };
  }

  /**
   * Prepares the arc arrays (mark and result) based on the total number of arcs (wordList.length - 1).
   */
  private initializeArcState(wordList: WordItem[]): {
    arcMark: Array<'none' | 'arc'>;
    resultArc: ValidationState[];
  } {
    const totalArcs = Math.max(wordList.length - 1, 0);
    return {
      arcMark: Array<'none' | 'arc'>(totalArcs).fill('none'),
      resultArc: Array<ValidationState>(totalArcs).fill(null)
    };
  }

  /**
   * Prepares the P arrays (mark and result) for the given total letters.
   */
  private initializePState(totalLetters: number): {
    pMark: Array<'none' | 'P'>;
    resultP: ValidationState[];
  } {
    return {
      pMark: Array<'none' | 'P'>(totalLetters).fill('none'),
      resultP: Array<ValidationState>(totalLetters).fill(null)
    };
  }

  /**
   * Prepares the underline arrays (mark and result) for the given total letters.
   */
  private initializeUnderlineState(totalLetters: number): {
    underlineMark: Array<'none' | 'underline'>;
    resultUnderline: ValidationState[];
  } {
    return {
      underlineMark: Array<'none' | 'underline'>(totalLetters).fill('none'),
      resultUnderline: Array<ValidationState>(totalLetters).fill(null)
    };
  }

  /**
   * Prepares the circle arrays (mark and result) for the given total letters.
   */
    private initializeCircleState(totalLetters: number): {
      circleMark: Array<'none' | 'circle'>;
      resultCircle: ValidationState[];
    } {
      return {
        circleMark: Array<'none' | 'circle'>(totalLetters).fill('none'),
        resultCircle: Array<ValidationState>(totalLetters).fill(null)
      };
    }

  /**
   * Orchestrates the creation of mark and result arrays for the exercise.
   * @param wordList - The list of words (and letters) for the exercise.
   * @param includeP - Whether to include arrays for the 'P' mark.
   * @param includeUnderline - Whether to include arrays for underline marks.
   */
  initializeExerciseState(
    wordList: WordItem[],
    includeP: boolean = false,
    includeUnderline: boolean = false,
    includeCircle: boolean = false
  ): void {
    // Mandatory initialization for accent and arc
    const { accentMark, resultAccent } = this.initializeAccentState(wordList);
    const { arcMark, resultArc } = this.initializeArcState(wordList);

    // Calculate total letters for optional marks
    const totalLetters = wordList.reduce((acc, w) => acc + w.letters.length, 0);

    // Initialize 'P' and 'underline' if required; otherwise, keep empty arrays
    const { pMark, resultP } = includeP
      ? this.initializePState(totalLetters)
      : { pMark: [], resultP: [] };
    const { underlineMark, resultUnderline } = includeUnderline
      ? this.initializeUnderlineState(totalLetters)
      : { underlineMark: [], resultUnderline: [] };

    // Initialize 'Circle' if required; otherwise, keep empty arrays
    const { circleMark, resultCircle } = includeCircle
    ? this.initializeCircleState(totalLetters)
    : { circleMark: [], resultCircle: [] };

    // Assign values to the corresponding signals
    this.wordList.set(wordList);
    this.accentMark.set(accentMark);
    this.arcMark.set(arcMark);
    this.resultAccent.set(resultAccent);
    this.resultArc.set(resultArc);
    this.pMark.set(pMark);
    this.resultP.set(resultP);
    this.underlineMark.set(underlineMark);
    this.resultUnderline.set(resultUnderline);
    this.circleMark.set(circleMark);
    this.resultCircle.set(resultCircle);
  }

  /**
   * Resets all marks to 'none' and validation results to null.
   */
  resetMarksAndResults(): void {
    // Reset validations to null
    this.resultAccent.set(this.resultAccent().map(() => null));
    this.resultArc.set(this.resultArc().map(() => null));
    this.resultP.set(this.resultP().map(() => null));
    this.resultUnderline.set(this.resultUnderline().map(() => null));
    this.resultCircle.set(this.resultCircle().map(() => null)); 


    // Reset marks to 'none'
    this.accentMark.set(this.accentMark().map(() => 'none'));
    this.arcMark.set(this.arcMark().map(() => 'none'));
    this.pMark.set(this.pMark().map(() => 'none'));
    this.underlineMark.set(this.underlineMark().map(() => 'none'));
    this.circleMark.set(this.circleMark().map(() => 'none')); 

  }
}

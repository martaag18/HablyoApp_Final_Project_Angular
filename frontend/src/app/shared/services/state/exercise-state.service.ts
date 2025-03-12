//Gestiona estado de un ejercicio -> Signals
import { Injectable, signal } from '@angular/core';
import { WordItem } from '../../interfaces/word-item.interface';
import { ValidationState } from '../../types/validation-state.type';

@Injectable({ providedIn: 'root' })
export class ExerciseStateService {

  // Lista palabras (y letras) del ejercicio
  wordList = signal<WordItem[]>([]);

  // Arrays que indican que MARCAS ha colocado el usuario. Cada posición corresponde a una letra / arco.
  tildeMark = signal<Array<'none' | '´'>>([]);
  arcMark = signal<Array<'none' | 'arc'>>([]);
  pMark = signal<Array<'none' | 'P'>>([]);
  underlineMark = signal<Array<'none' | 'underline'>>([]);

  // Arrays co el rstdo de la validación para cada marca. 
  resultTilde = signal<ValidationState[]>([]);
  resultArc = signal<ValidationState[]>([]);
  resultP = signal<ValidationState[]>([]);
  resultUnderline = signal<ValidationState[]>([]);

  private initializeTildeState(wordList: WordItem[]): { tildeMark: Array<'none' | '´'>; resultTilde: ValidationState[] } {
    const totalLetters = wordList.reduce((acc, w) => acc + w.letters.length, 0);
    return {
      tildeMark: Array<'none' | '´'>(totalLetters).fill('none'),
      resultTilde: Array<ValidationState>(totalLetters).fill(null)
    };
  }


  private initializeArcState(wordList: WordItem[]): { arcMark: Array<'none' | 'arc'>; resultArc: ValidationState[] } {
    const totalArcs = Math.max(wordList.length - 1, 0);
    return {
      arcMark: Array<'none' | 'arc'>(totalArcs).fill('none'),
      resultArc: Array<ValidationState>(totalArcs).fill(null)
    };
  }


  private initializePState(totalLetters: number): { pMark: Array<'none' | 'P'>; resultP: ValidationState[] } {
    return {
      pMark: Array<'none' | 'P'>(totalLetters).fill('none'),
      resultP: Array<ValidationState>(totalLetters).fill(null)
    };
  }


  private initializeUnderlineState(totalLetters: number): { underlineMark: Array<'none' | 'underline'>; resultUnderline: ValidationState[] } {
    return {
      underlineMark: Array<'none' | 'underline'>(totalLetters).fill('none'),
      resultUnderline: Array<ValidationState>(totalLetters).fill(null)
    };
  }

  //Orquesta la creación de los arrays de marcas y rtdos. 
  initializeExerciseState(
    wordList: WordItem[],
    includeP: boolean = false,
    includeUnderline: boolean = false
  ): void {
    // Inicialización de tilde y arc (obligatorio)
    const { tildeMark, resultTilde } = this.initializeTildeState(wordList);
    const { arcMark, resultArc } = this.initializeArcState(wordList);

    // Calcula el total de letras para las otras marcas
    const totalLetters = wordList.reduce((acc, w) => acc + w.letters.length, 0);

    // Inicializa "P" y "underline" si se requieren; si no, se dejan como arrays vacíos
    const { pMark, resultP } = includeP ? this.initializePState(totalLetters) : { pMark: [], resultP: [] };
    const { underlineMark, resultUnderline } = includeUnderline
      ? this.initializeUnderlineState(totalLetters)
      : { underlineMark: [], resultUnderline: [] };

    // Se asignan los valores a los signals correspondientes
    this.wordList.set(wordList);
    this.tildeMark.set(tildeMark);
    this.arcMark.set(arcMark);
    this.resultTilde.set(resultTilde);
    this.resultArc.set(resultArc);
    this.pMark.set(pMark);
    this.resultP.set(resultP);
    this.underlineMark.set(underlineMark);
    this.resultUnderline.set(resultUnderline);
  }

  //Restablecer todas las marcas a "none" y rtdos a "null"
  resetMarksAndResults(): void {
    // Restablecer validaciones a null
    this.resultTilde.set(this.resultTilde().map(() => null));
    this.resultArc.set(this.resultArc().map(() => null));
    this.resultP.set(this.resultP().map(() => null));
    this.resultUnderline.set(this.resultUnderline().map(() => null));

    // Restablecer marcas a 'none'
    this.tildeMark.set(this.tildeMark().map(() => 'none'));
    this.arcMark.set(this.arcMark().map(() => 'none'));
    this.pMark.set(this.pMark().map(() => 'none'));
    this.underlineMark.set(this.underlineMark().map(() => 'none'));
  }
}

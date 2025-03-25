// Validation of marks
import { Injectable, inject } from '@angular/core';
import { PService } from './p.service';
import { UnderlineService } from './underline.service';
import { WordItem } from '../../interfaces/word-item.interface';
import { ValidationState } from '../../types/validation-state.type';
import { ArcService } from './arc.service';
import { AccentService } from './accent.service';
import { CircleService } from './circle.service';
@Injectable({
  providedIn: 'root',
})
export class MarkingOrchestratorService {
  
  private arcService = inject(ArcService);
  private accentService = inject(AccentService);
  private pService = inject(PService);
  private underlineService = inject(UnderlineService); 
  private circleService = inject(CircleService);

  /**
   * Validates arcMark by delegating to ArcService
   */
  validateArcs(
    wordList: WordItem[],
    arcMark: Array<'none' | 'arc'>
  ): ValidationState[] {
    return this.arcService.validateArcs(wordList, arcMark);
  }

  /**
   * Validates accentMark by delegating to AccentService
   */
  validateAccents(
    accentMark: Array<'none' | '´'>,
    accentIndices?: number[]
  ): ValidationState[] {
    return this.accentService.validateAccents(accentMark, accentIndices);
  }

  /**
   * Validates the "P" mark by delegating to PService
   */
  validateP(
    wordList: WordItem[],
    pMark: Array<'none' | 'P'>,
    pIndices?: number[]
  ): ValidationState[] {
    return this.pService.validateP(pMark, pIndices);
  }

  /**
   * Validates the underline mark by delegating to UnderlineService
   */
  validateUnderlines(
    vdobleIndices: number[],
    underlineMark: Array<'none' | 'underline'>
  ): ValidationState[] {
    return this.underlineService.validateUnderlines(vdobleIndices, underlineMark);
  }

  /**
   * Validates the "Circle" mark by delegating to CircleService
   */
    validateCircle(
      circleMark: Array<'none' | 'circle'>,
      circleIndices?: number[]
    ): ValidationState[] {
      return this.circleService.validateCircle(circleMark, circleIndices);
    }

}

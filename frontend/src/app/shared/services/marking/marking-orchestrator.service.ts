//Validación de marcas
import { Injectable, inject } from '@angular/core';
import { PService } from './p.service';
import { UnderlineService } from './underline.service';
import { WordItem } from '../../interfaces/word-item.interface';
import { ValidationState } from '../../types/validation-state.type';
import { ArcService } from './arc.service';
import { TildeService } from './tilde.service';


@Injectable({
  providedIn: 'root',
})
export class MarkingOrchestratorService {
  
  private arcService = inject(ArcService);
  private tildeService = inject(TildeService);
  private pService = inject(PService);
  private underlineService = inject(UnderlineService); 

  
  //Valida arcMark => delega a ArcService
  validateArcs(
    wordList: WordItem[],
    arcMark: Array<'none' | 'arc'>
  ): ValidationState[] {
    return this.arcService.validateArcs(wordList, arcMark);
  }

  //Valida tildeMark => delega a TildeService
  validateTildes(
    tildeMark: Array<'none' | '´'>,
    tildeIndices?: number[]
  ): ValidationState[] {
    return this.tildeService.validateTildes(tildeMark, tildeIndices);
  }

  //Valida la marca "P" => delega a PService
  validateP(
    wordList: WordItem[],
    pMark: Array<'none' | 'P'>,
    pIndices?: number[]
  ): ValidationState[] {
    return this.pService.validateP(pMark, pIndices);
  }

  //Valida el underline
  validateUnderlines(
    vdobleIndices: number[],
    underlineMark: Array<'none' | 'underline'>
  ): ValidationState[] {
    return this.underlineService.validateUnderlines(vdobleIndices, underlineMark);
  }

}

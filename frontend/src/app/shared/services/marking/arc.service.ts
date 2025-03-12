//Validar si arcos que usuario coloca entre palabras son correctos o no. 
import { Injectable } from '@angular/core';
import { WordItem } from '../../interfaces/word-item.interface';
import { ValidationState } from '../../types/validation-state.type';

@Injectable({
  providedIn: 'root'
})
export class ArcService {


  validateArcs(wordList: WordItem[], arcMark: Array<'none' | 'arc'>): ValidationState[] {
    const result: ValidationState[] = [];

    for (let i = 0; i < arcMark.length; i++) {
      if (arcMark[i] === 'arc') { //marca de usuario
        // El usuario puso un arco
        if (wordList[i].arcToNext) { //necesidad arco
          result[i] = 'correct'; 
        } else {
          result[i] = 'wrong';   
        }
      } else {
        // arcMark[i] === 'none'
        if (wordList[i].arcToNext) {
          result[i] = 'missed';  
        } else {
          result[i] = null;     
        }
      }
    }
    return result;
  }
}

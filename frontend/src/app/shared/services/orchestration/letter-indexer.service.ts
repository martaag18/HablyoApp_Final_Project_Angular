//Dado un array de palabras, construye WordItem[], asignando globalIndex a cada letra.

import { Injectable } from '@angular/core';
import { WordItem } from '../../interfaces/word-item.interface';

@Injectable({ providedIn: 'root' })
export class LetterIndexerService {
 
  buildWordItems(words: string[]): WordItem[] {
    let globalIndexCounter = 0;
    const wordList: WordItem[] = [];

    for (const word of words) {
      const letters = word.split('').map((ch) => ({
        char: ch,
        globalIndex: globalIndexCounter++,
      }));

      wordList.push({ letters, arcToNext: false });
    }

    return wordList;
  }
}

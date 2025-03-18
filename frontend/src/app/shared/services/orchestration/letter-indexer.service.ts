// Given an array of words, builds a WordItem[] and assigns a globalIndex to each letter.

import { Injectable } from '@angular/core';
import { WordItem } from '../../interfaces/word-item.interface';

@Injectable({ providedIn: 'root' })
export class LetterIndexerService {
 
  /**
   * Splits each word into individual letters, assigning a unique globalIndex
   * to each letter, and returns an array of WordItem objects.
   * 
   * @param words - An array of strings (words).
   * @returns An array of WordItem objects, each containing letters with a globalIndex.
   */
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

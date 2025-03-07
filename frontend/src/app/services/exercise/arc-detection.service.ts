//Dado un WordItem[], determina arcToNext entre cada par de palabras.

import { Injectable } from '@angular/core';
import { WordItem } from '../../shared/interfaces/word-item.interface';

@Injectable({ providedIn: 'root' })
export class ArcDetectionService {

  private readonly vowels = ['a','e','i','o','u','á','é','í','ó','ú','h','y'];


  markArcToNext(wordList: WordItem[]): void {
    for (let i = 0; i < wordList.length - 1; i++) {
      const currentWord = wordList[i];
      const nextWord = wordList[i + 1];

      const lastChar = this.getLastCharOfWord(currentWord);
      const firstCharNext = this.getFirstCharOfWord(nextWord);

      if (this.isVowel(lastChar) && this.isVowel(firstCharNext)) {
        currentWord.arcToNext = true;
      }
    }
  }

  private getLastCharOfWord(wordItem: WordItem): string {
    if (!wordItem.letters.length) return '';
    return wordItem.letters[wordItem.letters.length - 1].char.toLowerCase();
  }

  private getFirstCharOfWord(wordItem: WordItem): string {
    if (!wordItem.letters.length) return '';
    return wordItem.letters[0].char.toLowerCase();
  }

  private isVowel(ch: string): boolean {
    return this.vowels.includes(ch.toLowerCase());
  }
}

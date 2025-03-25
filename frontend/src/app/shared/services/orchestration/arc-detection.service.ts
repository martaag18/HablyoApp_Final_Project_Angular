import { Injectable } from '@angular/core';
import { WordItem } from '../../interfaces/word-item.interface';

@Injectable({ providedIn: 'root' })
export class ArcDetectionService {
  private readonly vowels = ['a', 'e', 'i', 'o', 'u', 'á', 'é', 'í', 'ó', 'ú'];
  private readonly hChar = 'h';

  markArcToNext(wordList: WordItem[]): void {
    for (let i = 0; i < wordList.length - 1; i++) {
      const currentWord = wordList[i];
      const nextWord = wordList[i + 1];

      // Character at the end of the current word
      const lastChar = this.getLastCharOfWord(currentWord);
      // Character at the beginning of the next word
      const firstCharNext = this.getFirstCharOfWord(nextWord);

      // Check if the current word ends with a vowel or 'y'
      const currentEndsWithVowelOrY = this.endsWithVowelOrY(currentWord);
      // Check if the next word starts with a vowel or 'y'
      const nextStartsWithVowelOrY = this.startsWithVowelOrY(nextWord);

      // 1. Next word starts with 'h' and current word ends with vowel/'y'
      if (firstCharNext === this.hChar && currentEndsWithVowelOrY) {
        currentWord.arcToNext = true;
      }
      // 2. Current word ends with vowel/'y' and next word starts with vowel/'y'
      else if (currentEndsWithVowelOrY && nextStartsWithVowelOrY) {
        currentWord.arcToNext = true;
      }
      // 3. Current word ends with consonant and next word starts with vowel/'y'
      else if (!currentEndsWithVowelOrY && nextStartsWithVowelOrY) {
        currentWord.arcToNext = true;
      }
    }
  }

  /**
   * Returns the last character of the word in lowercase
   */
  private getLastCharOfWord(wordItem: WordItem): string {
    if (!wordItem.letters.length) return '';
    return wordItem.letters[wordItem.letters.length - 1].char.toLowerCase();
  }

  /**
   * Returns the first character of the word in lowercase
   */
  private getFirstCharOfWord(wordItem: WordItem): string {
    if (!wordItem.letters.length) return '';
    return wordItem.letters[0].char.toLowerCase();
  }

  /**
   * Returns true if the word ends with a vowel or 'y' used as a vowel
   */
  private endsWithVowelOrY(wordItem: WordItem): boolean {
    if (!wordItem.letters.length) return false;
    const lastChar = this.getLastCharOfWord(wordItem);

    // Case 1: ends with a standard vowel (a, e, i, o, u, accented)
    if (this.vowels.includes(lastChar)) {
      return true;
    }
    // Case 2: 'y' is considered a vowel if it is the last letter
    //         or if the word is just 'y' (connector).
    if (lastChar === 'y') {
      // If it is the only letter ("y")
      if (wordItem.letters.length === 1) {
        return true;
      }
      // Or if it is at the end
      return true;
    }
    return false;
  }

  /**
   * Returns true if the word starts with a vowel or is just 'y' (connector)
   */
  private startsWithVowelOrY(wordItem: WordItem): boolean {
    if (!wordItem.letters.length) return false;
    const firstChar = this.getFirstCharOfWord(wordItem);

    // Case 1: starts with a standard vowel
    if (this.vowels.includes(firstChar)) {
      return true;
    }
    // Case 2: if the word is just 'y', consider it a vowel
    if (firstChar === 'y' && wordItem.letters.length === 1) {
      return true;
    }
    return false;
  }
}

import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WordSplitterService {
  /**
   * splitIntoWords: Separa el texto en un array de palabras, 
   * filtrando vacíos si es necesario.
   */
  splitIntoWords(fullText: string): string[] {
    return fullText.split(/\s+/).filter((w) => w.length > 0);
  }
}

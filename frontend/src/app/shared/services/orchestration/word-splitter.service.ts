import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WordSplitterService {
 
  splitIntoWords(fullText: string): string[] {
    return fullText.split(/\s+/).filter((w) => w.length > 0);
  }
}

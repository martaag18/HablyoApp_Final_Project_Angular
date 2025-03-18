// Coordinates (or orchestrates) several steps to transform a text into a WordItem[] array for use in the exercise

import { Injectable, inject } from '@angular/core';
import { WordItem } from '../../interfaces/word-item.interface';
import { WordSplitterService } from './word-splitter.service';
import { LetterIndexerService } from './letter-indexer.service';
import { ArcDetectionService } from './arc-detection.service';

@Injectable({ providedIn: 'root' })
export class WordListOrchestratorService {

  private splitterService = inject(WordSplitterService);
  private indexerService = inject(LetterIndexerService);
  private arcDetectorService = inject(ArcDetectionService);

  /**
   * Builds a list of WordItem objects from a full text string by:
   * 1. Splitting the text into individual words.
   * 2. Converting each word into an array of letters, assigning a global index to each letter.
   * 3. Detecting if an arc should connect the current word to the next (both end/start with vowels).
   * @param fullText - The complete text to be processed.
   * @returns An array of WordItem objects.
   */
  buildWordList(fullText: string): WordItem[] {
    // Split the text into an array of words
    const words = this.splitterService.splitIntoWords(fullText);

    // From the array of words, build a WordItem[]:
    // - each word is split into letters
    // - each letter is assigned a global index indicating its absolute position in the entire text (spaces ignored)
    const wordList = this.indexerService.buildWordItems(words);

    // Check the generated words and mark arcToNext for those that end with a vowel and the next starts with a vowel
    this.arcDetectorService.markArcToNext(wordList);

    return wordList;
  }
}

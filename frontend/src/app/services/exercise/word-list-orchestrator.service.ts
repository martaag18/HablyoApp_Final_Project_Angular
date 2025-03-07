import { Injectable } from '@angular/core';
import { WordItem } from '../../shared/interfaces/word-item.interface';
import { WordSplitterService } from './word-splitter.service';
import { LetterIndexerService } from './letter-indexer.service';
import { ArcDetectionService } from './arc-detection.service';
import { inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WordListOrchestratorService {

  private splitterService = inject(WordSplitterService)
  private indexerService = inject(LetterIndexerService)
  private arcDetectorService = inject(ArcDetectionService)

  /**
   * buildWordList: Orquesta las llamadas para convertir el texto en WordItem[] 
   * con arcToNext marcado donde corresponda.
   */
  buildWordList(fullText: string): WordItem[] {
    // 1) Separar en palabras
    const words = this.splitterService.splitIntoWords(fullText);

    // 2) Crear WordItem[] con globalIndex
    const wordList = this.indexerService.buildWordItems(words);

    // 3) Marcar arcToNext
    this.arcDetectorService.markArcToNext(wordList);

    return wordList;
  }
}

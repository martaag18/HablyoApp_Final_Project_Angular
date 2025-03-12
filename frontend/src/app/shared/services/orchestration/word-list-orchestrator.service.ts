//Coordina (orquesta) varios pasos para convertir un texto en un array WordItem[] para usarse en el ejercicio
import { Injectable } from '@angular/core';
import { WordItem } from '../../interfaces/word-item.interface';
import { WordSplitterService } from './word-splitter.service';
import { LetterIndexerService } from './letter-indexer.service';
import { ArcDetectionService } from './arc-detection.service';
import { inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WordListOrchestratorService {

  private splitterService = inject(WordSplitterService)
  private indexerService = inject(LetterIndexerService)
  private arcDetectorService = inject(ArcDetectionService)


  buildWordList(fullText: string): WordItem[] {
    //separar texto en array de palabras
    const words = this.splitterService.splitIntoWords(fullText);

    //a partir del array de palabras -> constriuir lista de WordItem[] -> cada palabra se descompone en letras
    //asignamos a cada letra un globalIndex que indica la posición absoluta en todo el texto (ignoramos espacios)
    const wordList = this.indexerService.buildWordItems(words);

    //revisar palabras generadas y marcar propiedad arcToNext en aquellas que terminan en vocal y la siguiente empieza en vocal.
    this.arcDetectorService.markArcToNext(wordList);

    return wordList;
  }
}

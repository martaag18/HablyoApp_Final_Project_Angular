import { Component, computed, effect, inject, signal } from '@angular/core';
import { ExercisePresentationComponent } from '../exercise-vocal-presentation/exercise-presentation.component';
import { EXERCISES } from '../data/mocks/exercise-examples.mock';
import { EXERCISE_INTRODUCTION } from '../data/mocks/exercise-introducion.mock';
import { RouterLink } from '@angular/router';

// Interfaces
import { ExerciseData } from '../../../../../shared/interfaces/exercise-finalVocal-InitialVocal.interface';
import { WordItem } from '../../../../../shared/interfaces/word-item.interface';
import { ValidationState } from '../../../../../services/exercise/exercise-marking.service';

// Componentes “hijos” (navegación y acciones)
import { ExerciseNavigationComponent } from '../../../../../shared/components/exercises/exercise-navigation/exercise-navigation.component';
import { ExerciseActionsComponent } from '../../../../../shared/components/exercises/exercise-actions/exercise-actions.component';

// Servicios
import { ExerciseNavigatorService } from '../../../../../services/exercise/navigation/exercise-navigator.service';
import { ExerciseStateService } from '../../../../../services/exercise/exercise-state.service';
import { ExerciseActionsService } from '../../../../../services/exercise/exercise-actions.service';
import { DragDropService } from '../../../../../services/exercise/drag-drop.service';

@Component({
  imports: [
    ExercisePresentationComponent,
    ExerciseNavigationComponent,
    ExerciseActionsComponent,
    RouterLink,
  ],
  selector: 'app-exercise-container',
  templateUrl: './exercise-container.component.html',
  styleUrls: ['./exercise-container.component.scss'],
})
export class ExerciseContainerComponent {

  navigatorService = inject(ExerciseNavigatorService);
  stateService = inject(ExerciseStateService);
  actionsService = inject(ExerciseActionsService);
  dragDrop = inject(DragDropService);

  allExercises = signal<ExerciseData[]>(EXERCISES);

  explanation = EXERCISE_INTRODUCTION;

  //computed signal -> valor reactivo que depende de otros signals. 
  currentExercise = computed(() => {
    const index = this.navigatorService.currentIndex();
    return this.allExercises()[index];
  });

  constructor() {
    effect(() => {
      const index = this.navigatorService.currentIndex();
      this.loadExercise(index);
    });
  }

  loadExercise(index: number) {
    // Validamos rango
    if (index < 0 || index >= this.allExercises().length) return;

    // Tomamos el ejercicio correspondiente
    const exercise = this.allExercises()[index];

    // Construimos la lista de palabras/letras
    const wordList = this.buildWordList(exercise.text);

    // Calculamos cuántas letras/arcos hay en total
    const totalLetters = wordList.reduce((acc, w) => acc + w.letters.length, 0);
    const totalArcs = wordList.length - 1;

    // Creamos los arrays iniciales para annotation, arcs, y sus validaciones
    const annotation = Array<'none' | '´'>(totalLetters).fill('none');
    const arcs = Array<'none' | 'arc'>(totalArcs).fill('none');
    const resultLetters = Array<ValidationState>(totalLetters).fill(null);
    const resultArcs = Array<ValidationState>(totalArcs).fill(null);

    // Asignamos estos datos al servicio de estado
    this.stateService.setInitialData(wordList, annotation, arcs, resultLetters, resultArcs);
  }

  
  buildWordList(fullText: string): WordItem[] {
    const words = fullText.split(/\s+/);
    let globalIndexCounter = 0;
    const wordList: WordItem[] = [];

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const letters = word.split('').map(ch => ({
        char: ch,
        globalIndex: globalIndexCounter++,
      }));

      let arcToNext = false;
      if (i < words.length - 1) {
        const lastChar = word.slice(-1).toLowerCase();
        const firstCharNext = words[i + 1].charAt(0).toLowerCase();
        arcToNext = this.isVowel(lastChar) && this.isVowel(firstCharNext);
      }

      wordList.push({ letters, arcToNext });
    }
    return wordList;
  }

  isVowel(ch: string): boolean {
    return ['a','e','i','o','u','á','é','í','ó','ú','h','y'].includes(ch);
  }

  // ========== Métodos que delegan en los servicios ==========

  // Acciones principales
  onComplete() {
    const index = this.navigatorService.currentIndex();
    const exercise = this.allExercises()[index];
    this.actionsService.onComplete(exercise);
  }

  onSolve() {
    const index = this.navigatorService.currentIndex();
    const exercise = this.allExercises()[index];
    this.actionsService.onSolve(exercise);
  }

  onRestart() {
    this.actionsService.onRestart();
  }

  // Navegación
  onNextExercise() {
    this.navigatorService.next(this.allExercises().length);
  }

  onPreviousExercise() {
    this.navigatorService.previous();
  }

  get showPreviousButton(): boolean {
    return this.navigatorService.currentIndex() > 0;
  }

  // Drag & drop
  onLetterDropped(payload: { letterIndex: number; mark: '´' }) {
    this.dragDrop.dropLetter(payload.letterIndex, payload.mark);
  }

  onArcDropped(payload: { arcIndex: number; mark: 'arc' }) {
    this.dragDrop.dropArc(payload.arcIndex, payload.mark);
  }
}

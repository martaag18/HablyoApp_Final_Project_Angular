import { Component, computed, effect, inject, signal } from '@angular/core';

// Interfaces
import { ExerciseData } from '../../../../../shared/interfaces/exercise-data.interface';

// Componentes “hijos”
import { ExercisePresentationComponent } from '../exercise-vocal-presentation/exercise-presentation.component';
import { ExerciseNavigationComponent } from '../../../../../shared/components/exercises/exercise-navigation/exercise-navigation.component';
import { ExerciseActionsComponent } from '../../../../../shared/components/exercises/exercise-actions/exercise-actions.component';

// Servicios
import { ExerciseNavigatorService } from '../../../../../services/exercise/navigation/exercise-navigator.service';
import { ExerciseStateService } from '../../../../../services/exercise/exercise-state.service';
import { ExerciseActionsService } from '../../../../../services/exercise/exercise-actions.service';
import { DragDropService } from '../../../../../services/exercise/drag-drop.service';
import { WordListOrchestratorService } from '../../../../../services/exercise/word-list-orchestrator.service';

// Mocks
import { EXERCISES_VOCAL_FINAL_VOCAL_INICIAL } from '../data/mocks/exercise-examples.mock';
import { EXERCISE_INTRODUCTION_VOCAL_INICIAL_VOCAL_FINAL } from '../data/mocks/exercise-introducion.mock';
import { ExerciseHeaderComponent } from '../../../../../shared/components/exercises/exercise-header/exercise-header.component';

@Component({
  standalone: true,
  imports: [
    ExercisePresentationComponent,
    ExerciseNavigationComponent,
    ExerciseActionsComponent,
    ExerciseHeaderComponent,
  ],
  selector: 'app-exercise-container',
  templateUrl: './exercise-container.component.html',
  styleUrls: ['./exercise-container.component.scss'],
})
export class ExerciseContainerComponent {

  navigatorService = inject(ExerciseNavigatorService);
  stateService = inject(ExerciseStateService);
  actionsService = inject(ExerciseActionsService);
  dragDropService = inject(DragDropService);
  wordListOrchestrator = inject(WordListOrchestratorService);

  allExercises = signal<ExerciseData[]>(EXERCISES_VOCAL_FINAL_VOCAL_INICIAL);
  explanation = EXERCISE_INTRODUCTION_VOCAL_INICIAL_VOCAL_FINAL;

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
    if (index < 0 || index >= this.allExercises().length) {
      return;
    }
  
    const exercise = this.allExercises()[index];
    const wordList = this.wordListOrchestrator.buildWordList(exercise.text);
    
    this.stateService.initializeExerciseState(wordList);
  }
  // ========== Métodos que delegan en los servicios ==========

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

  onNextExercise() {
    this.navigatorService.next(this.allExercises().length);
  }

  onPreviousExercise() {
    this.navigatorService.previous();
  }

  showPreviousButton = computed(() => this.navigatorService.currentIndex() > 0);

  onTildeDropped(payload: { letterIndex: number; mark: '´' }) {
    this.dragDropService.dropTilde(payload.letterIndex, payload.mark);
  }

  onArcDropped(payload: { arcIndex: number; mark: 'arc' }) {
    this.dragDropService.dropArc(payload.arcIndex, payload.mark);
  }
}

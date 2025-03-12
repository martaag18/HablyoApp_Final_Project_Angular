//Coordina (orquesta) la lógica del ejercicio -> delega el trabajo a los servicios
import { Component, computed, effect, inject, signal } from '@angular/core';

// Interfaces
import { ExerciseData } from '../../../../../shared/interfaces/exercise-data.interface';

// Componentes “hijos”
import { ExercisePresentationComponent } from '../exercise-vocal-presentation/exercise-presentation.component';
import { ExerciseNavigationComponent } from '../../../../../shared/components/exercises/exercise-navigation/exercise-navigation.component';
import { ExerciseActionsComponent } from '../../../../../shared/components/exercises/exercise-actions/exercise-actions.component';

// Servicios
import { ExerciseNavigatorService } from '../../../../../shared/services/navigation/exercise-navigator.service';
import { ExerciseStateService } from '../../../../../shared/services/state/exercise-state.service';
import { ExerciseActionsService } from '../../../../../shared/services/actions/exercise-actions.service';
import { DragDropService } from '../../../../../shared/services/drag-drop/drag-drop.service';
import { WordListOrchestratorService } from '../../../../../shared/services/orchestration/word-list-orchestrator.service';

// Mocks
import { EXERCISES_VOCAL_FINAL_VOCAL_INICIAL } from '../data/mocks/exercise-examples.mock';
import { EXERCISE_INTRODUCTION_VOCAL_INICIAL_VOCAL_FINAL } from '../data/mocks/exercise-introducion.mock';
import { ExerciseHeaderComponent } from '../../../../../shared/components/exercises/exercise-header/exercise-header.component';

@Component({
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
    effect(() => { //cada ve que el indice cambia, llama a loadExercise(index) -> carga ejercicio se ejecuta de forma reactiva
      const index = this.navigatorService.currentIndex();
      this.initializeCurrentExercise(index);
    });
  }

  initializeCurrentExercise(index: number) {
    if (index < 0 || index >= this.allExercises().length) {
      console.error(`Índice fuera de rango: ${index}. No se cargará ningún ejercicio.`);
      return;
    }
  
    const exercise = this.allExercises()[index];
    const wordList = this.wordListOrchestrator.buildWordList(exercise.text);
    
    this.stateService.initializeExerciseState(wordList);
  }
  // ========== Métodos delegados a los servicios ==========

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

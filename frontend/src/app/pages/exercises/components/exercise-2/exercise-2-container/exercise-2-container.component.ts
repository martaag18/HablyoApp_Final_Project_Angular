import { Component, computed, effect, inject, signal } from '@angular/core';
import { Exercise2PresentationComponent } from '../exercise-2-presentation/exercise-2-presentation.component';

// Mocks
import { EXERCISES_2 } from '../data/mocks/exercise-2-examples.mock';

// Interfaces
import { ExerciseData } from '../../../../../shared/interfaces/exercise-data.interface';
import { WordItem } from '../../../../../shared/interfaces/word-item.interface';

// Componentes “hijos”
import { ExerciseNavigationComponent } from '../../../../../shared/components/exercises/exercise-navigation/exercise-navigation.component';
import { ExerciseActionsComponent } from '../../../../../shared/components/exercises/exercise-actions/exercise-actions.component';
import { Exercise2IntroductionComponent } from './exercise-2-introduction/exercise-2-introduction.component';
// Servicios
import { ExerciseNavigatorService } from '../../../../../shared/services/navigation/exercise-navigator.service';
import { ExerciseStateService } from '../../../../../shared/services/state/exercise-state.service';
import { ExerciseActionsService } from '../../../../../shared/services/actions/exercise-actions.service';
import { DragDropService } from '../../../../../shared/services/drag-drop/drag-drop.service';
import { WordListOrchestratorService } from '../../../../../shared/services/orchestration/word-list-orchestrator.service';

@Component({
  imports: [
    Exercise2PresentationComponent,
    ExerciseNavigationComponent,
    ExerciseActionsComponent,
    Exercise2IntroductionComponent
  ],
  selector: 'app-exercise-doble-vocal-container',
  templateUrl: './exercise-2-container.component.html',
  // styleUrls: ['./exercise-doble-vocal-container.component.scss'],
})
export class ExerciseDobleVocalContainerComponent {

  navigatorService = inject(ExerciseNavigatorService);
  stateService = inject(ExerciseStateService);
  private actionsService = inject(ExerciseActionsService);
  private dragDropService = inject(DragDropService);
  private wordListOrchestrator = inject(WordListOrchestratorService);

  allExercises = signal<ExerciseData[]>(EXERCISES_2);

  currentExercise = computed(() => {
    const index = this.navigatorService.currentIndex();
    return this.allExercises()[index];
  });

  // Almacenamos los índices de doble vocal para pasarlos al componente de presentación
  public doubleVocalIndices: number[] = [];

  constructor() {
    effect(() => {
      const index = this.navigatorService.currentIndex();
      this.initializeCurrentExercise(index);
    });
  }

  initializeCurrentExercise(index: number): void {
    if (index < 0 || index >= this.allExercises().length){
      console.error(`Índice fuera de rango: ${index}. No se cargará el ejercicio.`);
      return;
    }
    
    const exercise = this.allExercises()[index];

    // Guardamos los índices de doble vocal para el componente de presentación
    this.doubleVocalIndices = exercise.doubleVocalIndices ?? [];

    // Construimos la wordList usando el orquestador
    const wordList: WordItem[] = this.wordListOrchestrator.buildWordList(exercise.text);

    // Inicializamos tanto la "P" como el "underline"
    this.stateService.initializeExerciseState(wordList, true, true);
  }

  // ================== Métodos delegados a servicios ===================

  onComplete(): void {
    const index = this.navigatorService.currentIndex();
    const exercise = this.allExercises()[index];
    this.actionsService.onComplete(exercise);
  }

  onSolve(): void {
    const index = this.navigatorService.currentIndex();
    const exercise = this.allExercises()[index];
    this.actionsService.onSolve(exercise);
  }

  onRestart(): void {
    this.actionsService.onRestart();
  }

  onNextExercise(): void {
    this.navigatorService.next(this.allExercises().length);
  }

  onPreviousExercise(): void {
    this.navigatorService.previous();
  }

  showPreviousButton = computed(() => this.navigatorService.currentIndex() > 0);

  onAccentDropped(payload: { letterIndex: number; mark: '´' }): void {
    this.dragDropService.dropAccent(payload.letterIndex, payload.mark);
  }

  onArcDropped(payload: { arcIndex: number; mark: 'arc' }): void {
    this.dragDropService.dropArc(payload.arcIndex, payload.mark);
  }

  onPDropped(payload: { letterIndex: number; mark: 'P' }): void {
    this.dragDropService.dropP(payload.letterIndex, payload.mark);
  }

  onUnderlineDropped(payload: { underlineIndex: number; mark: 'underline' }): void {
    this.dragDropService.dropUnderline(payload.underlineIndex, payload.mark);
  }
}

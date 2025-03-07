import { Component, computed, effect, inject, signal } from '@angular/core';
import { ExerciseDobleVocalPresentationComponent } from '../exercise-doble-vocal-presentation/exercise-doble-vocal-presentation.component';

// Mocks
import { EXERCISES_DOBLE_VOCAL } from '../data/mocks/exercise-examples.mock';
import { EXERCISE_INTRODUCTION_DOBLE_VOCAL } from '../data/mocks/exercise-doble-vocal-introducion.mock';

// Interfaces
import { ExerciseData } from '../../../../../shared/interfaces/exercise-data.interface';
import { WordItem } from '../../../../../shared/interfaces/word-item.interface';

// Componentes “hijos”
import { ExerciseNavigationComponent } from '../../../../../shared/components/exercises/exercise-navigation/exercise-navigation.component';
import { ExerciseActionsComponent } from '../../../../../shared/components/exercises/exercise-actions/exercise-actions.component';
import { ExerciseHeaderComponent } from '../../../../../shared/components/exercises/exercise-header/exercise-header.component';
// Servicios
import { ExerciseNavigatorService } from '../../../../../services/exercise/navigation/exercise-navigator.service';
import { ExerciseStateService } from '../../../../../services/exercise/exercise-state.service';
import { ExerciseActionsService } from '../../../../../services/exercise/exercise-actions.service';
import { DragDropService } from '../../../../../services/exercise/drag-drop.service';
import { WordListOrchestratorService } from '../../../../../services/exercise/word-list-orchestrator.service';

@Component({
  standalone: true,
  imports: [
    ExerciseDobleVocalPresentationComponent,
    ExerciseNavigationComponent,
    ExerciseActionsComponent,
    ExerciseHeaderComponent
  ],
  selector: 'app-exercise-doble-vocal-container',
  templateUrl: './exercise-doble-vocal-container.component.html',
  styleUrls: ['./exercise-doble-vocal-container.component.scss'],
})
export class ExerciseDobleVocalContainerComponent {

  navigatorService = inject(ExerciseNavigatorService);
  stateService = inject(ExerciseStateService);
  private actionsService = inject(ExerciseActionsService);
  private dragDropService = inject(DragDropService);
  private wordListOrchestrator = inject(WordListOrchestratorService);

  // Lista de todos los ejercicios disponibles
  allExercises = signal<ExerciseData[]>(EXERCISES_DOBLE_VOCAL);

  // Texto de introducción al ejercicio “doble vocal”
  explanation = EXERCISE_INTRODUCTION_DOBLE_VOCAL;

  // Mostrar ejercicio actual
  currentExercise = computed(() => {
    const index = this.navigatorService.currentIndex();
    return this.allExercises()[index];
  });

  // Almacenamos los índices de doble vocal para pasarlos al componente de presentación
  public vdobleIndices: number[] = [];

  constructor() {
    effect(() => {
      const index = this.navigatorService.currentIndex();
      this.loadExercise(index);
    });
  }

  loadExercise(index: number): void {
    if (index < 0 || index >= this.allExercises().length) return;

    const exercise = this.allExercises()[index];

    // Guardamos los índices de doble vocal para el componente de presentación
    this.vdobleIndices = exercise.vdobleIndices ?? [];

    // Construimos la wordList usando el orquestador
    const wordList: WordItem[] = this.wordListOrchestrator.buildWordList(exercise.text);

    // Inicializamos el estado para este ejercicio
    // En este ejercicio, inicializamos tanto la "P" como el "underline"
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

  // Navegación
  onNextExercise(): void {
    this.navigatorService.next(this.allExercises().length);
  }

  onPreviousExercise(): void {
    this.navigatorService.previous();
  }

  get showPreviousButton(): boolean {
    return this.navigatorService.currentIndex() > 0;
  }

  // Drag & drop: Tilde
  onTildeDropped(payload: { letterIndex: number; mark: '´' }): void {
    this.dragDropService.dropTilde(payload.letterIndex, payload.mark);
  }

  // Drag & drop: Arc
  onArcDropped(payload: { arcIndex: number; mark: 'arc' }): void {
    this.dragDropService.dropArc(payload.arcIndex, payload.mark);
  }

  // Drag & drop: “P”
  onPDropped(payload: { letterIndex: number; mark: 'P' }): void {
    this.dragDropService.dropP(payload.letterIndex, payload.mark);
  }

  // Drag & drop: Underline
  onUnderlineDropped(payload: { underlineIndex: number; mark: 'underline' }): void {
    this.dragDropService.dropUnderline(payload.underlineIndex, payload.mark);
  }
}

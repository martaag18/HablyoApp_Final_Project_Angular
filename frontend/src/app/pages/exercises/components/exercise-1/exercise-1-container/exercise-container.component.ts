//Coordina (orquesta) la lógica del ejercicio -> delega el trabajo a los servicios
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';

// Interfaces
import { ExerciseData } from '../../../../../shared/interfaces/exercise-data.interface';

// Componentes “hijos”
import { Exercise1PresentationComponent } from '../exercise-1-presentation/exercise1-presentation.component';
import { ExerciseNavigationComponent } from '../../../../../shared/components/exercises/exercise-navigation/exercise-navigation.component';
import { ExerciseActionsComponent } from '../../../../../shared/components/exercises/exercise-actions/exercise-actions.component';
import { Exercise1IntroductionComponent } from './exercise-1-introduction/exercise-1-introduction.component';

// Servicios
import { ExerciseNavigatorService } from '../../../../../shared/services/navigation/exercise-navigator.service';
import { ExerciseStateService } from '../../../../../shared/services/state/exercise-state.service';
import { ExerciseActionsService } from '../../../../../shared/services/actions/exercise-actions.service';
import { DragDropService } from '../../../../../shared/services/drag-drop/drag-drop.service';
import { WordListOrchestratorService } from '../../../../../shared/services/orchestration/word-list-orchestrator.service';

// Mocks
import { EXERCISES_1 } from '../data/mocks/exercise-1-examples.mock';

@Component({
  imports: [
    Exercise1PresentationComponent,
    ExerciseNavigationComponent,
    ExerciseActionsComponent,
    Exercise1IntroductionComponent
  ],
  selector: 'app-exercise-container',
  templateUrl: './exercise-container.component.html',
  // styleUrls: ['./exercise-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush 

})
export class Exercise1ContainerComponent {

  navigatorService = inject(ExerciseNavigatorService);
  stateService = inject(ExerciseStateService);
  actionsService = inject(ExerciseActionsService);
  dragDropService = inject(DragDropService);
  wordListOrchestrator = inject(WordListOrchestratorService);

  allExercises = signal<ExerciseData[]>(EXERCISES_1);

  currentExercise = computed(() => {
    const index = this.navigatorService.currentIndex();
    return this.allExercises()[index];
  });


  constructor() {
    effect(() => { 
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
// ========== Methods delegated to the services ==========

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

  onFirstExercise(){
    this.navigatorService.firstExercise();
  }

  showPreviousButton = computed(() => this.navigatorService.currentIndex() > 0);

  onAccentDropped(payload: { letterIndex: number; mark: '´' }) {
    this.dragDropService.dropAccent(payload.letterIndex, payload.mark);
  }

  onArcDropped(payload: { arcIndex: number; mark: 'arc' }) {
    this.dragDropService.dropArc(payload.arcIndex, payload.mark);
  }
}

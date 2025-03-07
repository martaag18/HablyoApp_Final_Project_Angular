import { Injectable, inject } from '@angular/core';
import { ExerciseMarkingService } from './exercise-marking.service';
import { ExerciseData } from '../../shared/interfaces/exercise-data.interface';
import { ExerciseStateService } from './exercise-state.service';

@Injectable({ providedIn: 'root' })
export class ExerciseActionsService {

  private stateService = inject(ExerciseStateService);
  private markingService = inject(ExerciseMarkingService);

  onComplete(currentExercise: ExerciseData) {
    // 1) Validar arcMark
    const arcValidation = this.markingService.validateArcs(
      this.stateService.wordList(),
      this.stateService.arcMark()
    );
    this.stateService.resultArc.set(arcValidation);

    // 2) Validar tildeMark
    const tIndices = currentExercise.tildeIndices || [];
    const tildeValidation = this.markingService.validateTildes(
      this.stateService.tildeMark(),
      tIndices
    );
    this.stateService.resultTilde.set(tildeValidation);

    // 3) Validar pMark
    const pIndices = currentExercise.pIndices || [];
    const pValidation = this.markingService.validateP(
      this.stateService.wordList(),
      this.stateService.pMark(),
      pIndices
    );
    this.stateService.resultP.set(pValidation);

    // 4) Validar underlineMark usando vdobleIndices
    const vdobleIndices = currentExercise.vdobleIndices || [];
    const underlineValidation = this.markingService.validateUnderlines(
      vdobleIndices,
      this.stateService.underlineMark()
    );
    this.stateService.resultUnderline.set(underlineValidation);
  }

  onSolve(currentExercise: ExerciseData) {
    const tIndices = currentExercise.tildeIndices || [];
    const pIndices = currentExercise.pIndices || [];
    const vdobleIndices = currentExercise.vdobleIndices || [];

    // Generamos la solución (arc, tilde, P y underline)
    const solution = this.markingService.generateSolution(
      this.stateService.wordList(),
      vdobleIndices,
      tIndices,
      pIndices
    );

    // Asignamos arcMark, tildeMark, pMark y underlineMark
    this.stateService.arcMark.set(solution.arcMark);
    this.stateService.tildeMark.set(solution.tildeMark);
    this.stateService.pMark.set(solution.pMark);
    this.stateService.underlineMark.set(solution.underlineMark);
  }

  // reiniciar el estado del ejercicio actual sin modificar su estructura.
  onRestart() {
    // Resetea validaciones
    this.stateService.resultTilde.set(this.stateService.resultTilde().map(() => null));
    this.stateService.resultArc.set(this.stateService.resultArc().map(() => null));
    this.stateService.resultP.set(this.stateService.resultP().map(() => null));
    this.stateService.resultUnderline.set(this.stateService.resultUnderline().map(() => null));

    // Resetea marcas
    this.stateService.tildeMark.set(this.stateService.tildeMark().map(() => 'none'));
    this.stateService.arcMark.set(this.stateService.arcMark().map(() => 'none'));
    this.stateService.pMark.set(this.stateService.pMark().map(() => 'none'));
    this.stateService.underlineMark.set(this.stateService.underlineMark().map(() => 'none'));
  }
}

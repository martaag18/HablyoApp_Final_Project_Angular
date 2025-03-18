import { Injectable, inject } from '@angular/core';
import { MarkingOrchestratorService } from '../marking/marking-orchestrator.service';
import { ExerciseData } from '../../interfaces/exercise-data.interface';
import { ExerciseStateService } from '../state/exercise-state.service';
import { SolutionGeneratorService } from '../solution/solution-generator.service';

@Injectable({ providedIn: 'root' })
export class ExerciseActionsService {

  private stateService = inject(ExerciseStateService);
  private markingService = inject(MarkingOrchestratorService);
  private solutionGeneratorService = inject(SolutionGeneratorService);

  onComplete(currentExercise: ExerciseData) {
    this.validateArcMark();
    this.validateAccentMark(currentExercise);
    this.validatePMark(currentExercise);
    this.validateUnderlineMark(currentExercise);
  }

  onSolve(currentExercise: ExerciseData) {
    const { aIndices, pIndices, doubleVocalIndices } = this.extractIndices(currentExercise);
    const solution = this.generateSolution(aIndices, pIndices, doubleVocalIndices);
    this.applySolution(solution);
  }

  onRestart() {
    this.stateService.resetMarksAndResults();
  }

  // ================= Métodos privados onComplete =================

  private validateArcMark(): void {
    const arcValidation = this.markingService.validateArcs(
      this.stateService.wordList(),
      this.stateService.arcMark()
    );
    this.stateService.resultArc.set(arcValidation);
  }

  private validateAccentMark(currentExercise: ExerciseData): void {
    const aIndices = currentExercise.accentIndices || [];
    const accentValidation = this.markingService.validateAccents(
      this.stateService.accentMark(),
      aIndices
    );
    this.stateService.resultAccent.set(accentValidation);
  }

  private validatePMark(currentExercise: ExerciseData): void {
    const pIndices = currentExercise.pIndices || [];
    const pValidation = this.markingService.validateP(
      this.stateService.wordList(),
      this.stateService.pMark(),
      pIndices
    );
    this.stateService.resultP.set(pValidation);
  }

  private validateUnderlineMark(currentExercise: ExerciseData): void {
    const doubleVocalIndices = currentExercise.doubleVocalIndices || [];
    const underlineValidation = this.markingService.validateUnderlines(
      doubleVocalIndices,
      this.stateService.underlineMark()
    );
    this.stateService.resultUnderline.set(underlineValidation);
  }

  // ================= Private methods for onSolve =================


  private extractIndices(currentExercise: ExerciseData) {
    return {
      aIndices: currentExercise.accentIndices || [],
      pIndices: currentExercise.pIndices || [],
      doubleVocalIndices: currentExercise.doubleVocalIndices || [],
    };
  }

 
  private generateSolution(
    aIndices: number[],
    pIndices: number[],
    doubleVocalIndices: number[]
  ) {
    return this.solutionGeneratorService.generateSolution(
      this.stateService.wordList(),
      doubleVocalIndices,
      aIndices,
      pIndices
    );
  }


  private applySolution(solution: {
    arcMark: Array<'none' | 'arc'>;
    accentMark: Array<'none' | '´'>;
    pMark: Array<'none' | 'P'>;
    underlineMark: Array<'none' | 'underline'>;
  }) {
    this.stateService.arcMark.set(solution.arcMark);
    this.stateService.accentMark.set(solution.accentMark);
    this.stateService.pMark.set(solution.pMark);
    this.stateService.underlineMark.set(solution.underlineMark);
  }
}

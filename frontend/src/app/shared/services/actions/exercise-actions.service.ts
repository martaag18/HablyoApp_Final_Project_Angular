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
    this.validateTildeMark(currentExercise);
    this.validatePMark(currentExercise);
    this.validateUnderlineMark(currentExercise);
  }

  onSolve(currentExercise: ExerciseData) {
    const { tIndices, pIndices, vdobleIndices } = this.extractIndices(currentExercise);
    const solution = this.generateSolution(tIndices, pIndices, vdobleIndices);
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

  private validateTildeMark(currentExercise: ExerciseData): void {
    const tIndices = currentExercise.tildeIndices || [];
    const tildeValidation = this.markingService.validateTildes(
      this.stateService.tildeMark(),
      tIndices
    );
    this.stateService.resultTilde.set(tildeValidation);
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
    const vdobleIndices = currentExercise.vdobleIndices || [];
    const underlineValidation = this.markingService.validateUnderlines(
      vdobleIndices,
      this.stateService.underlineMark()
    );
    this.stateService.resultUnderline.set(underlineValidation);
  }

  // ================= Métodos privados para onSolve =================


  private extractIndices(currentExercise: ExerciseData) {
    return {
      tIndices: currentExercise.tildeIndices || [],
      pIndices: currentExercise.pIndices || [],
      vdobleIndices: currentExercise.vdobleIndices || [],
    };
  }

 
  private generateSolution(
    tIndices: number[],
    pIndices: number[],
    vdobleIndices: number[]
  ) {
    return this.solutionGeneratorService.generateSolution(
      this.stateService.wordList(),
      vdobleIndices,
      tIndices,
      pIndices
    );
  }


  private applySolution(solution: {
    arcMark: Array<'none' | 'arc'>;
    tildeMark: Array<'none' | '´'>;
    pMark: Array<'none' | 'P'>;
    underlineMark: Array<'none' | 'underline'>;
  }) {
    this.stateService.arcMark.set(solution.arcMark);
    this.stateService.tildeMark.set(solution.tildeMark);
    this.stateService.pMark.set(solution.pMark);
    this.stateService.underlineMark.set(solution.underlineMark);
  }
}

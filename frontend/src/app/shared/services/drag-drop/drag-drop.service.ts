import { Injectable, inject } from '@angular/core';
import { ExerciseStateService } from '../state/exercise-state.service';

@Injectable({ providedIn: 'root' })
export class DragDropService {

  private state = inject(ExerciseStateService); //servicio donde se almacenan (signals) las marcas (tilde, p, arco, underline)

  dropTilde(letterIndex: number, mark: '´') {
    const tildeMark = [...this.state.tildeMark()];
    tildeMark[letterIndex] = mark; // '´'
    this.state.tildeMark.set(tildeMark);
  }

  dropP(letterIndex: number, mark: 'P') {
    const pMark = [...this.state.pMark()];
    pMark[letterIndex] = mark; // 'P'
    this.state.pMark.set(pMark);
  }

  dropArc(arcIndex: number, mark: 'arc') {
    const arcMark = [...this.state.arcMark()];
    arcMark[arcIndex] = mark; // 'arc'
    this.state.arcMark.set(arcMark);
  }

  dropUnderline(underlineIndex: number, mark: 'underline') {
    const underlineMark = [...this.state.underlineMark()];
    underlineMark[underlineIndex] = mark; // 'underline'
    this.state.underlineMark.set(underlineMark);
  }
  
}

// FLUJO:

// 1. Usuario suelta una marca en la interfaz
// 2. Componente contenedor llama método DragDropService con el índice y la marca 
// 3. Servicio actualiza el array de marcas en el estado global (ExerciseStateService) 
// 4. Interfaz se actualiza mosntrando la nueva marca en la posición adecuada (gracias reactividad Signals)
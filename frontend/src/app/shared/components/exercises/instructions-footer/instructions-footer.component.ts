import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  imports: [],
  selector: 'app-instructions-footer',
  templateUrl: './instructions-footer.component.html',
  styleUrls: ['./instructions-footer.component.scss']
})
export class InstructionsFooterComponent {
  @Input() instructionsText: string = `
  Arrastra ´ sobre la letra. <br>
  Arrastra ∿ debajo de la unión de palabras. <br><br>
  <span class="inline-block">
    <span class="bg-green-200 px-1 rounded">Verde</span> = correct,
    <span class="bg-red-200 px-1 rounded">rojo</span> = wrong,
    <span class="bg-yellow-200 px-1 rounded">amarillo</span> = missed.
  </span>
`;

}

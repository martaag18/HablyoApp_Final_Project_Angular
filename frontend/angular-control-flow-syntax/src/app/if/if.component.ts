import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-if',
  imports: [NgIf],
  templateUrl: './if.component.html',
  styleUrl: './if.component.scss'
})
export class IfComponent {

  //control-flow-syntax
  //angular --> plataforma de estructura (porque brinda funcionalidad a algo que antes no lo tenía). Lo hace a través de las directivas (estructurales(modifica la estructura del DOM) y de atributos)

  protected isVisible = true; //protected: se podrá utilizar en HTML, es accesible dentro de la clase dónde se define y sus subclases. Protected es bueno usarlo cuando quieres mostrar algo en pantalla. Diferencia con PRIVATE? private será solo para esta clase y el template no puede acceder  una propiedad privada, 
}

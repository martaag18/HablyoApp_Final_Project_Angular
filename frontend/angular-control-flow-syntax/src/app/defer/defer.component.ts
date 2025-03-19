import { Component } from '@angular/core';

@Component({
  selector: 'app-defer',
  imports: [],
  templateUrl: './defer.component.html',
  styleUrl: './defer.component.scss'
})
export class DeferComponent {

  //permite cargar contenido de forma diferida, según una condición
  //mejora el rendimiento, aplica lazy loading ya que retrasa si queremos la carga de partes no críticas de nuestra app. 

  isImageVisible = false; 

  showImage(){
    this.isImageVisible = true;
  }
}

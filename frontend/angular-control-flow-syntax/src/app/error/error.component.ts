import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent implements OnInit {

  isContentReady = false;
  isContentReadyError = false;

  ngOnInit(){
    setTimeout(() => {
      this.isContentReady = true;
    },3000);

    setTimeout(() => {
      throw new Error("Simulated Load Error");
    }, 3000);

  }
}
//El error deberia ir de HIJO a PADRE. 

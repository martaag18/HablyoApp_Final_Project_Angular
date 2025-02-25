import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WebinarDatesService } from '../../../services/webinar-dates.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatDatepickerModule, MatInputModule],
  templateUrl: './webinar-signup.component.html',
  styleUrls: ['./webinar-signup.component.scss'],
})
export class WebinarSignupComponent {

  webinarDatesService = inject(WebinarDatesService);

  myDateFilter = this.webinarDatesService.myDateFilter;

  signupForm = new FormGroup({
    webinarDate: new FormControl('', Validators.required),
    name: new FormControl("", Validators.required),
    surname: new FormControl("", Validators.required),
    age: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    motivation: new FormControl("", [Validators.required]),
    questions: new FormControl("",),
  });

  onSubmit(){
    if(this.signupForm.valid){
      console.log("Datos del formulario", this.signupForm.value);
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}

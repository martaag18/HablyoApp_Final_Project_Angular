import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { WebinarDatesService } from '../../../services/webinar-dates.service';
import { UsersWebinarService } from '../../../services/users-webinar.service';
import { WebinarRegister } from '../../../shared/interfaces/webinar-register.interface';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatDatepickerModule, MatInputModule],
  templateUrl: './webinar-signup.component.html',
  styleUrls: ['./webinar-signup.component.scss'],
})
export class WebinarSignupComponent {

  webinarDatesService = inject(WebinarDatesService);
  webinarUserService = inject(UsersWebinarService);

  myDateFilter = this.webinarDatesService.myDateFilter;

  signupForm = new FormGroup({
    webinarDate: new FormControl<Date | null>(null, Validators.required),  
    name: new FormControl("", Validators.required),  
    surname: new FormControl("", Validators.required),
    age: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    motivation: new FormControl("", [Validators.required]),
    questions: new FormControl("",),
  });

  onSubmit() {
    if (this.signupForm.valid) {
       //Convertir age a number
      const ageValue = this.signupForm.value.age!;
      const ageNumber = Number(ageValue); 
      const data: WebinarRegister = {
        webinarDate: this.signupForm.value.webinarDate!,
        name: this.signupForm.value.name!,
        surname: this.signupForm.value.surname!,
        age: ageNumber,
        email: this.signupForm.value.email!,
        motivation: this.signupForm.value.motivation!,
        questions: this.signupForm.value.questions!,
      };

      this.webinarUserService.registerUserWebinar(data).subscribe({
        next: (res) => {
          console.log(res.message); 
          console.log(res.data);    
          alert(res.message);
        },
        error: (err) => {
          console.error('Error al inscribirse', err);
          alert('Error al inscribirse: ' + err.error.message);
        }
      });
    } else {
      this.signupForm.markAllAsTouched();
    }
  }
}  

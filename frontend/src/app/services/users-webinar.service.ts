import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { WebinarRegister } from '../shared/interfaces/webinar-register.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersWebinarService {

  private http = inject(HttpClient)
  private API_URL = "http://localhost:3000/users-webinar/signup";

  registerUserWebinar(data: WebinarRegister ): Observable<{ message: string; data: any }> {
    console.log('Enviando datos a /users-webinar/signup', data);
    return this.http.post<{ message: string; data: any }>(this.API_URL, data);
  }
  
}
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Register } from '../../shared/interfaces/register.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private http = inject(HttpClient)
  private API_URL = "https://localhost:3000/users";

  registerUser (data: Register) : Observable<{message: string}> {
    console.log('Enviando datos a POST /users:', data);
    return this.http.post<{message:string}>(this.API_URL, data);
  }
}

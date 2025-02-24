import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginData } from '../shared/interfaces/login.interface';
import { CheckLoginResponse } from '../shared/interfaces/check-login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private API_URL = 'http://localhost:3000/auth';

 
  isLoggedSignal = signal(false);

  login(data: LoginData): Observable<any> {
    return this.http.post(`${this.API_URL}/login`, data, {
      withCredentials: true // importante para que el navegador acepte/envíe la cookie
    }).pipe(
      tap(() => {
        this.isLoggedSignal.set(true);
      })
    );
  }
  
  logout(): Observable<any> {
    return this.http.post(`${this.API_URL}/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.isLoggedSignal.set(false);
      })
    );
  }

  checkLogin(): Observable<CheckLoginResponse>{
    return this.http.get<CheckLoginResponse>(`${this.API_URL}/check`, {
      withCredentials: true
    }).pipe(tap((res) => { 
      this.isLoggedSignal.set(res.loggedIn);
    }));
  }
  //pipe -> encadenar operadores de RxJS (tap, map, catchError..) -> transformar o interactuar con las emisiones del observable
  //tap -> ejecutar efectos secundarios en cada emisión del observable SIN transformar valor
}

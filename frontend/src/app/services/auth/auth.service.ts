import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { LoginData } from '../../shared/interfaces/login.interface';
import { CheckLoginResponse } from '../../shared/interfaces/check-login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private API_URL = 'https://localhost:3000/auth';

  // Signal to track login status
  isLoggedSignal = signal(false);

  /**
   * Initiates the login process by sending a POST request with user credentials.
   * If successful, sets `isLoggedSignal` to true.
   */
  login(data: LoginData): Observable<any> {
    console.log('AuthService: initiating login...', data);

    return this.http.post(`${this.API_URL}/login`, data, {
      withCredentials: true // include/send cookies with the request
    }).pipe(
      tap({
        next: (response) => {
          console.log('AuthService: login() -> successful response:', response);
          this.isLoggedSignal.set(true);
        },
        error: (err) => {
          console.error('AuthService: login() -> error response:', err);
        }
      })
    );
  }
  
  /**
   * Logs out the user by calling the logout endpoint and
   * updates `isLoggedSignal` to false upon success.
   */
  logout(): Observable<any> {
    return this.http.post(`${this.API_URL}/logout`, {}, {
      withCredentials: true
    }).pipe(
      tap(() => {
        this.isLoggedSignal.set(false);
      })
    );
  }

  /**
   * Checks if the user is currently logged in by calling the /check endpoint.
   * Updates `isLoggedSignal` based on the response.
   */
  checkLogin(): Observable<CheckLoginResponse> {
    console.log('AuthService: calling checkLogin...');
    return this.http.get<CheckLoginResponse>(`${this.API_URL}/check`, {
      withCredentials: true
    }).pipe(
      tap({
        next: (res) => {
          console.log('AuthService: checkLogin -> response:', res);
          this.isLoggedSignal.set(res.loggedIn);
        },
        error: (err) => {
          console.error('AuthService: checkLogin -> error:', err);
        }
      })
    );
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.API_URL}/forgot-password`, { email }, {
      withCredentials: true
    });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.API_URL}/reset-password`, { token, newPassword }, {
      withCredentials: true
    });
  }
  
}

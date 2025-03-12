import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhitelistService {

  private http = inject(HttpClient)
  private API_URL = "https://localhost:3000/whitelist";

  checkEmail(email: string): Observable <{ email: string; whitelisted: boolean }> {
    const query = `?email=${encodeURIComponent(email.trim().toLowerCase())}`;
    return this.http.get<{ email: string; whitelisted: boolean }>(this.API_URL + query);
  }
}

import { Injectable, inject } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // Llama al servidor para comprobar si la cookie 'jwt' es válida
    return this.authService.checkLogin().pipe(
      map((res) => {
        if (res.loggedIn) {
          // Está logueado, permitir acceso
          return true;
        } else {
          // No está logueado, redirigir a login
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError((err) => {
        // Si hay error (token inválido, sin conexión, etc.), redirigir a login
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}

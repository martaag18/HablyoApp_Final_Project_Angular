// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { Observable, of } from 'rxjs';
// import { catchError, map } from 'rxjs/operators';
// import { AuthService} from '../services/auth.service';
// import { inject } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {

//   private authService = inject(AuthService);
//   private router = inject(Router)

//   canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
//     // 1. Llamar a checkLogin() -> ver si la cookie 'jwt' es válida
//     return this.authService.checkLogin().pipe(
//       map((res: any) => {
//         if (res.loggedIn) {
//           return true;
//         } else {
//           this.router.navigate(['/login']);
//           return false;
//         }
//       }),
//       catchError((err) => {
//         this.router.navigate(['/login']);
//         return of(false); //devuelve false en un observable
//       })
//     );
//   }
// }

/* TEOTIRA 

1. canActivate -> interfaz de Angular que oblica a implementar el método canActivate, cuando se navega a una ruta que tiene canActivate: [AuthGuard], Angular llama a canActivate() 
2. canActivate -> Retornar boolean indicando si se permite acceso
//route: ActivatedRouteSnapshot -> contiene información sobre la ruta que se está intentando acceder
//state: RouterStateSnapshot -> contiene información sobre el estado actual de la ruta
3. Observable al llamar método asíncrono -> checkLogin() -> check al backend para verificar si cookie jwt es válida
4. pipe()-> permite encadenar operadores como map, catchError -> transformar o manejar la respuesta
5. map() -> transforma la respuesta del backend en un booleano
*/

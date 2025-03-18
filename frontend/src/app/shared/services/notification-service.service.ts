import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { inject } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private snackBar = inject(MatSnackBar)

  success(message: string, action: string = ''): void {
    this.snackBar.open(message, action, {
      duration: 5000, 
      verticalPosition: 'top', 
      horizontalPosition: 'center', 
      panelClass: ['snackbar-success']
    });
  }

  error(message: string, action: string = 'Ok'): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: ['snackbar-error']
    });
  }

}

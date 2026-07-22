import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  constructor(private readonly snackBar: MatSnackBar) {}

  success(message: string): void {
    this.snackBar.open(message, 'Fermer', { duration: 3500 });
  }

  error(message: string): void {
    this.snackBar.open(message, 'Fermer', { duration: 5000 });
  }
}

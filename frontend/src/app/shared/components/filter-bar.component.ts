import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  template: `
    <mat-form-field class="full-width" subscriptSizing="dynamic">
      <mat-label>{{ label }}</mat-label>
      <input matInput [formControl]="control" [placeholder]="placeholder">
    </mat-form-field>
  `,
  styles: ['.full-width { width: 100%; }'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterBarComponent {
  @Input() label = 'Filtre';
  @Input() placeholder = 'Tapez pour filtrer...';
  @Output() valueChange = new EventEmitter<string>();

  protected readonly control = new FormControl('', { nonNullable: true });

  constructor() {
    this.control.valueChanges.pipe(debounceTime(200)).subscribe((value) => this.valueChange.emit(value));
  }
}

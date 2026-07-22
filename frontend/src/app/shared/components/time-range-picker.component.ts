import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { TimeRangeService } from '../../core/services/time-range.service';

@Component({
  selector: 'app-time-range-picker',
  standalone: true,
  imports: [MatSelectModule, NgFor],
  template: `
    <mat-form-field subscriptSizing="dynamic">
      <mat-label>Période</mat-label>
      <mat-select [value]="timeRangeService.selected().value" (valueChange)="update($event)">
        <mat-option *ngFor="let option of timeRangeService.options" [value]="option.value">{{ option.label }}</mat-option>
      </mat-select>
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimeRangePickerComponent {
  constructor(public readonly timeRangeService: TimeRangeService) {}

  protected update(value: string): void {
    const match = this.timeRangeService.options.find((option) => option.value === value);
    if (match) {
      this.timeRangeService.selected.set(match);
    }
  }
}

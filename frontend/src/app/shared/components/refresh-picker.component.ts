import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { TimeRangeService } from '../../core/services/time-range.service';

@Component({
  selector: 'app-refresh-picker',
  standalone: true,
  imports: [MatSelectModule, NgFor],
  template: `
    <mat-form-field subscriptSizing="dynamic">
      <mat-label>Rafraîchissement</mat-label>
      <mat-select [value]="timeRangeService.refreshInterval()" (valueChange)="timeRangeService.refreshInterval.set($event)">
        <mat-option *ngFor="let option of options" [value]="option.value">{{ option.label }}</mat-option>
      </mat-select>
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RefreshPickerComponent {
  protected readonly options = [
    { label: 'Off', value: 0 },
    { label: '15s', value: 15000 },
    { label: '30s', value: 30000 },
    { label: '1m', value: 60000 }
  ];

  constructor(public readonly timeRangeService: TimeRangeService) {}
}

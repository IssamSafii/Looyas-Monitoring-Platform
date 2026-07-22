import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-error-state',
  standalone: true,
  imports: [NgIf, MatButtonModule],
  template: `
    <div class="state-card error">
      <div class="state-title">Impossible de recuperer les donnees.</div>
      <div class="muted">{{ message }}</div>
      <button mat-stroked-button type="button" (click)="retry.emit()">Reessayer</button>
      <details *ngIf="details">
        <summary>Details techniques</summary>
        <pre class="details">{{ details }}</pre>
      </details>
    </div>
  `,
  styles: [`
    .state-card {
      display: grid;
      gap: 0.75rem;
      padding: 1.1rem;
      border-radius: var(--radius-md);
    }
    .error {
      border: 1px solid rgba(255, 107, 107, 0.28);
      background: rgba(255, 107, 107, 0.05);
    }
    .state-title {
      font-weight: 700;
    }
    .details {
      white-space: pre-wrap;
      margin: 0;
      font-size: 0.8rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorStateComponent {
  @Input() message = 'Une erreur est survenue.';
  @Input() details = '';
  @Output() retry = new EventEmitter<void>();
}

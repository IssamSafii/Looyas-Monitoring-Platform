import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  template: `
    <div class="state-card">
      <div class="state-title">{{ title }}</div>
      <div class="muted">{{ description }}</div>
    </div>
  `,
  styles: [`
    .state-card {
      padding: 1.1rem;
      border: 1px dashed var(--border-soft);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      background: rgba(255, 255, 255, 0.02);
    }
    .state-title {
      font-weight: 600;
      margin-bottom: 0.35rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyStateComponent {
  @Input() title = 'Aucune donnee recue pour cette periode.';
  @Input() description = 'Ajustez la periode, les filtres ou verifiez la source.';
}

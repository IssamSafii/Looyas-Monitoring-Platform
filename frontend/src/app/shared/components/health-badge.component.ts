import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { HealthStatusResponse } from '../../core/models/monitoring.model';

@Component({
  selector: 'app-health-badge',
  standalone: true,
  imports: [NgClass],
  template: `
    <span class="chip" [ngClass]="badgeClass">
      {{ label }}
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HealthBadgeComponent {
  @Input({ required: true }) status!: HealthStatusResponse['status'];

  get label(): string {
    return this.status === 'CONNECTED' ? 'Connected'
      : this.status === 'DEGRADED' ? 'Degraded'
      : this.status === 'DISCONNECTED' ? 'Disconnected'
      : 'Unknown';
  }

  get badgeClass(): string {
    return `status-${this.label.toLowerCase()}`;
  }
}

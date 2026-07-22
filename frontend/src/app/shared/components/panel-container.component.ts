import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-panel-container',
  standalone: true,
  imports: [NgIf],
  template: `
    <section class="app-card surface-padding panel">
      <div class="panel-header" *ngIf="title || subtitle">
        <div>
          <div class="panel-title">{{ title }}</div>
          <div class="muted">{{ subtitle }}</div>
        </div>
        <ng-content select="[panel-actions]"></ng-content>
      </div>
      <ng-content></ng-content>
    </section>
  `,
  styles: [`
    .panel { display: grid; gap: 1rem; min-width: 0; }
    .panel-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 1rem; }
    .panel-title { font-size: 1rem; font-weight: 700; }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelContainerComponent {
  @Input() title = '';
  @Input() subtitle = '';
}

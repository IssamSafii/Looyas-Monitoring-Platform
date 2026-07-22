import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { LogStream } from '../../core/models/monitoring.model';
import { EmptyStateComponent } from './empty-state.component';

@Component({
  selector: 'app-logs-viewer',
  standalone: true,
  imports: [NgFor, NgIf, EmptyStateComponent],
  template: `
    <app-empty-state *ngIf="!streams.length"></app-empty-state>

    <div class="streams" *ngIf="streams.length">
      <div *ngFor="let stream of streams" class="stream">
        <div class="labels">
          <span *ngFor="let key of objectKeys(stream.labels)" class="chip">{{ key }}={{ stream.labels[key] }}</span>
        </div>

        <div
          *ngFor="let entry of stream.entries"
          class="entry"
          [class.error]="entry.level === 'ERROR'"
          [class.warn]="entry.level === 'WARN'"
          [class.info]="entry.level === 'INFO'"
        >
          <div class="entry-meta">
            <span class="timestamp monospace">{{ entry.timestamp }}</span>
            <span class="level-chip">{{ entry.level || 'INFO' }}</span>
          </div>
          <pre>{{ entry.message }}</pre>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .streams {
      display: grid;
      gap: 1rem;
      max-height: 920px;
      overflow: auto;
      padding-right: 0.15rem;
    }
    .stream {
      display: grid;
      gap: 0.65rem;
    }
    .labels {
      display: flex;
      gap: 0.45rem;
      flex-wrap: wrap;
    }
    .entry {
      padding: 0.72rem 0.82rem;
      border: 1px solid var(--border-soft);
      border-radius: var(--radius-md);
      background: rgba(255, 255, 255, 0.025);
    }
    .entry.error {
      border-color: rgba(255, 107, 107, 0.26);
      background: rgba(255, 107, 107, 0.05);
    }
    .entry.warn {
      border-color: rgba(255, 180, 84, 0.26);
      background: rgba(255, 180, 84, 0.05);
    }
    .entry.info {
      border-color: rgba(88, 166, 255, 0.16);
    }
    .entry-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 0.75rem;
      margin-bottom: 0.45rem;
    }
    .timestamp {
      color: var(--text-secondary);
      font-size: 0.76rem;
      line-height: 1.35;
    }
    .level-chip {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 64px;
      padding: 0.2rem 0.55rem;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.06);
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.05em;
    }
    pre {
      margin: 0;
      color: var(--text-primary);
      white-space: pre-wrap;
      word-break: break-word;
      font-family: Consolas, "Courier New", monospace;
      font-size: 0.82rem;
      line-height: 1.55;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogsViewerComponent {
  @Input() streams: LogStream[] = [];

  protected objectKeys(value: Record<string, string>): string[] {
    return Object.keys(value);
  }
}

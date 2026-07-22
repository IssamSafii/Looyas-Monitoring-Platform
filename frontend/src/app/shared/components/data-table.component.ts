import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { EmptyStateComponent } from './empty-state.component';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [NgIf, NgFor, EmptyStateComponent],
  template: `
    <app-empty-state *ngIf="!rows.length"></app-empty-state>
    <div class="table-wrapper" *ngIf="rows.length">
      <table>
        <thead>
          <tr>
            <th *ngFor="let column of columns">{{ column }}</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of rows">
            <td *ngFor="let column of columns">{{ row[column] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .table-wrapper { overflow: auto; border: 1px solid var(--border-soft); border-radius: var(--radius-md); }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: 0.85rem 0.9rem; text-align: left; border-bottom: 1px solid var(--border-soft); }
    th { color: var(--text-secondary); font-weight: 600; background: rgba(255,255,255,0.02); }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {
  @Input() columns: string[] = [];
  @Input() rows: Record<string, unknown>[] = [];
}

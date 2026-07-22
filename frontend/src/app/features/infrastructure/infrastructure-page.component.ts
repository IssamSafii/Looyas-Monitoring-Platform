import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import { DataTableComponent } from '../../shared/components/data-table.component';
import { MonitoringService } from '../../core/services/monitoring.service';

@Component({
  selector: 'app-infrastructure-page',
  standalone: true,
  imports: [NgFor, PanelContainerComponent, DataTableComponent],
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">Infrastructure</h1>
        <div class="page-subtitle">Découverte dynamique des labels exposés par Mimir.</div>
      </div>
    </div>

    <div class="section-grid">
      <div class="span-12">
        <app-panel-container title="Labels détectés" subtitle="Clusters, nodes, namespaces, pods, containers et instances">
          <app-data-table [columns]="['type', 'count', 'preview']" [rows]="rows"></app-data-table>
        </app-panel-container>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfrastructurePageComponent implements OnInit {
  protected rows: Record<string, unknown>[] = [];

  constructor(private readonly monitoringService: MonitoringService) {}

  ngOnInit(): void {
    const keys = ['cluster', 'node', 'namespace', 'pod', 'container', 'instance'];
    forkJoin(keys.map((key) =>
      this.monitoringService.metricLabelValues(key).pipe(catchError(() => of({ data: [] as string[] })))
    )).subscribe((results) => {
      this.rows = results.map((result, index) => ({
        type: keys[index],
        count: result.data.length,
        preview: result.data.slice(0, 5).join(', ')
      }));
    });
  }
}

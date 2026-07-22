import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import { StatCardComponent } from '../../shared/components/stat-card.component';
import { DataTableComponent } from '../../shared/components/data-table.component';
import { MonitoringService } from '../../core/services/monitoring.service';

@Component({
  selector: 'app-kubernetes-page',
  standalone: true,
  imports: [PanelContainerComponent, StatCardComponent, DataTableComponent],
  template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">Kubernetes</h1>
        <div class="page-subtitle">Synthèse temps réel des workloads et nœuds exposés.</div>
      </div>
    </div>

    <div class="grid-tiles">
      <app-stat-card *ngFor="let stat of stats" [title]="stat.title" [value]="stat.value" [unit]="stat.unit" [description]="stat.description"></app-stat-card>
    </div>

    <div class="section-grid" style="margin-top: 1rem;">
      <div class="span-12">
        <app-panel-container title="Pods les plus actifs" subtitle="CPU par pod sur la dernière heure">
          <app-data-table [columns]="['name', 'value']" [rows]="podRows"></app-data-table>
        </app-panel-container>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KubernetesPageComponent implements OnInit {
  protected stats = [
    { title: 'Nodes Ready', description: 'Nœuds prêts', value: '-', unit: '' },
    { title: 'Pods Running', description: 'Pods actifs', value: '-', unit: '' },
    { title: 'Pods Pending', description: 'Pods en attente', value: '-', unit: '' },
    { title: 'Pods Failed', description: 'Pods en erreur', value: '-', unit: '' }
  ];
  protected podRows: Record<string, unknown>[] = [];

  constructor(private readonly monitoringService: MonitoringService) {}

  ngOnInit(): void {
    forkJoin({
      nodes: this.monitoringService.queryMetrics({ query: 'sum(kube_node_status_condition{condition="Ready",status="true"})' }).pipe(catchError(() => of(null))),
      running: this.monitoringService.queryMetrics({ query: 'sum(kube_pod_status_phase{phase="Running"})' }).pipe(catchError(() => of(null))),
      pending: this.monitoringService.queryMetrics({ query: 'sum(kube_pod_status_phase{phase="Pending"})' }).pipe(catchError(() => of(null))),
      failed: this.monitoringService.queryMetrics({ query: 'sum(kube_pod_status_phase{phase="Failed"})' }).pipe(catchError(() => of(null))),
      podsCpu: this.monitoringService.queryMetrics({ query: 'topk(10, sum by (pod) (rate(container_cpu_usage_seconds_total[5m])))' }).pipe(catchError(() => of(null)))
    }).subscribe((result) => {
      this.stats[0].value = lastValue(result.nodes);
      this.stats[1].value = lastValue(result.running);
      this.stats[2].value = lastValue(result.pending);
      this.stats[3].value = lastValue(result.failed);
      this.podRows = (result.podsCpu?.series ?? []).map((series) => ({
        name: series.name,
        value: series.points.at(-1)?.value?.toFixed(4) ?? '-'
      }));
    });
  }
}

function lastValue(result: { series: { points: { value: number | null }[] }[] } | null): string {
  const value = result?.series?.[0]?.points?.at(-1)?.value;
  return value == null ? '-' : value.toFixed(2);
}

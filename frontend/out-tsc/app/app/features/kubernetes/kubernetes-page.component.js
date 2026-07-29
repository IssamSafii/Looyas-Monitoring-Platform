import { ChangeDetectionStrategy, Component } from '@angular/core';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import { StatCardComponent } from '../../shared/components/stat-card.component';
import { DataTableComponent } from '../../shared/components/data-table.component';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/monitoring.service";
const _c0 = () => ["name", "value"];
function KubernetesPageComponent_app_stat_card_7_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-stat-card", 9);
} if (rf & 2) {
    const stat_r1 = ctx.$implicit;
    i0.ɵɵproperty("title", stat_r1.title)("value", stat_r1.value)("unit", stat_r1.unit)("description", stat_r1.description);
} }
export class KubernetesPageComponent {
    constructor(monitoringService) {
        this.monitoringService = monitoringService;
        this.stats = [
            { title: 'Nodes Ready', description: 'Nœuds prêts', value: '-', unit: '' },
            { title: 'Pods Running', description: 'Pods actifs', value: '-', unit: '' },
            { title: 'Pods Pending', description: 'Pods en attente', value: '-', unit: '' },
            { title: 'Pods Failed', description: 'Pods en erreur', value: '-', unit: '' }
        ];
        this.podRows = [];
    }
    ngOnInit() {
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
    static { this.ɵfac = function KubernetesPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || KubernetesPageComponent)(i0.ɵɵdirectiveInject(i1.MonitoringService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: KubernetesPageComponent, selectors: [["app-kubernetes-page"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 12, vars: 4, consts: [[1, "page-header"], [1, "page-title"], [1, "page-subtitle"], [1, "grid-tiles"], [3, "title", "value", "unit", "description", 4, "ngFor", "ngForOf"], [1, "section-grid", 2, "margin-top", "1rem"], [1, "span-12"], ["title", "Pods les plus actifs", "subtitle", "CPU par pod sur la derni\u00E8re heure"], [3, "columns", "rows"], [3, "title", "value", "unit", "description"]], template: function KubernetesPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div")(2, "h1", 1);
            i0.ɵɵtext(3, "Kubernetes");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 2);
            i0.ɵɵtext(5, "Synth\u00E8se temps r\u00E9el des workloads et n\u0153uds expos\u00E9s.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(6, "div", 3);
            i0.ɵɵtemplate(7, KubernetesPageComponent_app_stat_card_7_Template, 1, 4, "app-stat-card", 4);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(8, "div", 5)(9, "div", 6)(10, "app-panel-container", 7);
            i0.ɵɵelement(11, "app-data-table", 8);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngForOf", ctx.stats);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("columns", i0.ɵɵpureFunction0(3, _c0))("rows", ctx.podRows);
        } }, dependencies: [PanelContainerComponent, StatCardComponent, DataTableComponent], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(KubernetesPageComponent, [{
        type: Component,
        args: [{
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
            }]
    }], () => [{ type: i1.MonitoringService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(KubernetesPageComponent, { className: "KubernetesPageComponent", filePath: "src\\app\\features\\kubernetes\\kubernetes-page.component.ts", lineNumber: 35 }); })();
function lastValue(result) {
    const value = result?.series?.[0]?.points?.at(-1)?.value;
    return value == null ? '-' : value.toFixed(2);
}
//# sourceMappingURL=kubernetes-page.component.js.map
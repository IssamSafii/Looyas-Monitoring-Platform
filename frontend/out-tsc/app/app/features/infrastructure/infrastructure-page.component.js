import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import { DataTableComponent } from '../../shared/components/data-table.component';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/monitoring.service";
const _c0 = () => ["type", "count", "preview"];
export class InfrastructurePageComponent {
    constructor(monitoringService) {
        this.monitoringService = monitoringService;
        this.rows = [];
    }
    ngOnInit() {
        const keys = ['cluster', 'node', 'namespace', 'pod', 'container', 'instance'];
        forkJoin(keys.map((key) => this.monitoringService.metricLabelValues(key).pipe(catchError(() => of({ data: [] }))))).subscribe((results) => {
            this.rows = results.map((result, index) => ({
                type: keys[index],
                count: result.data.length,
                preview: result.data.slice(0, 5).join(', ')
            }));
        });
    }
    static { this.ɵfac = function InfrastructurePageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || InfrastructurePageComponent)(i0.ɵɵdirectiveInject(i1.MonitoringService)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: InfrastructurePageComponent, selectors: [["app-infrastructure-page"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 10, vars: 3, consts: [[1, "page-header"], [1, "page-title"], [1, "page-subtitle"], [1, "section-grid"], [1, "span-12"], ["title", "Labels d\u00E9tect\u00E9s", "subtitle", "Clusters, nodes, namespaces, pods, containers et instances"], [3, "columns", "rows"]], template: function InfrastructurePageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0)(1, "div")(2, "h1", 1);
            i0.ɵɵtext(3, "Infrastructure");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 2);
            i0.ɵɵtext(5, "D\u00E9couverte dynamique des labels expos\u00E9s par Mimir.");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(6, "div", 3)(7, "div", 4)(8, "app-panel-container", 5);
            i0.ɵɵelement(9, "app-data-table", 6);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(9);
            i0.ɵɵproperty("columns", i0.ɵɵpureFunction0(2, _c0))("rows", ctx.rows);
        } }, dependencies: [PanelContainerComponent, DataTableComponent], encapsulation: 2, changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(InfrastructurePageComponent, [{
        type: Component,
        args: [{
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
            }]
    }], () => [{ type: i1.MonitoringService }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(InfrastructurePageComponent, { className: "InfrastructurePageComponent", filePath: "src\\app\\features\\infrastructure\\infrastructure-page.component.ts", lineNumber: 31 }); })();
//# sourceMappingURL=infrastructure-page.component.js.map
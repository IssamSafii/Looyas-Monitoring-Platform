import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { EmptyStateComponent } from './empty-state.component';
import * as i0 from "@angular/core";
function LogsViewerComponent_app_empty_state_0_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state");
} }
function LogsViewerComponent_div_1_div_1_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span", 8);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const key_r1 = ctx.$implicit;
    const stream_r2 = i0.ɵɵnextContext().$implicit;
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2("", key_r1, "=", stream_r2.labels[key_r1], "");
} }
function LogsViewerComponent_div_1_div_1_div_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 9)(1, "div", 10)(2, "span", 11);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 12);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "pre");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const entry_r3 = ctx.$implicit;
    i0.ɵɵclassProp("error", entry_r3.level === "ERROR")("warn", entry_r3.level === "WARN")("info", entry_r3.level === "INFO");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(entry_r3.timestamp);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(entry_r3.level || "INFO");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(entry_r3.message);
} }
function LogsViewerComponent_div_1_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 4)(1, "div", 5);
    i0.ɵɵtemplate(2, LogsViewerComponent_div_1_div_1_span_2_Template, 2, 2, "span", 6);
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(3, LogsViewerComponent_div_1_div_1_div_3_Template, 8, 9, "div", 7);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const stream_r2 = ctx.$implicit;
    const ctx_r3 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngForOf", ctx_r3.objectKeys(stream_r2.labels));
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", stream_r2.entries);
} }
function LogsViewerComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 2);
    i0.ɵɵtemplate(1, LogsViewerComponent_div_1_div_1_Template, 4, 2, "div", 3);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r3.streams);
} }
export class LogsViewerComponent {
    constructor() {
        this.streams = [];
    }
    objectKeys(value) {
        return Object.keys(value);
    }
    static { this.ɵfac = function LogsViewerComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || LogsViewerComponent)(); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LogsViewerComponent, selectors: [["app-logs-viewer"]], inputs: { streams: "streams" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 2, vars: 2, consts: [[4, "ngIf"], ["class", "streams", 4, "ngIf"], [1, "streams"], ["class", "stream", 4, "ngFor", "ngForOf"], [1, "stream"], [1, "labels"], ["class", "chip", 4, "ngFor", "ngForOf"], ["class", "entry", 3, "error", "warn", "info", 4, "ngFor", "ngForOf"], [1, "chip"], [1, "entry"], [1, "entry-meta"], [1, "timestamp", "monospace"], [1, "level-chip"]], template: function LogsViewerComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵtemplate(0, LogsViewerComponent_app_empty_state_0_Template, 1, 0, "app-empty-state", 0)(1, LogsViewerComponent_div_1_Template, 2, 1, "div", 1);
        } if (rf & 2) {
            i0.ɵɵproperty("ngIf", !ctx.streams.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.streams.length);
        } }, dependencies: [NgFor, NgIf, EmptyStateComponent], styles: [".streams[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 1.1rem;\n      max-height: 980px;\n      overflow: auto;\n      padding: 0.1rem 0.2rem 0.1rem 0.1rem;\n    }\n    .stream[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.8rem;\n      padding: 0.9rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(255, 255, 255, 0.025);\n    }\n    .labels[_ngcontent-%COMP%] {\n      display: flex;\n      gap: 0.45rem;\n      flex-wrap: wrap;\n    }\n    .entry[_ngcontent-%COMP%] {\n      padding: 0.72rem 0.82rem;\n      border: 1px solid var(--border-soft);\n      border-radius: calc(var(--radius-md) - 2px);\n      background: rgba(8, 14, 25, 0.46);\n    }\n    .entry.error[_ngcontent-%COMP%] {\n      border-color: rgba(255, 107, 107, 0.26);\n      background: rgba(255, 107, 107, 0.05);\n    }\n    .entry.warn[_ngcontent-%COMP%] {\n      border-color: rgba(255, 180, 84, 0.26);\n      background: rgba(255, 180, 84, 0.05);\n    }\n    .entry.info[_ngcontent-%COMP%] {\n      border-color: rgba(88, 166, 255, 0.16);\n    }\n    .entry-meta[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 0.75rem;\n      margin-bottom: 0.45rem;\n    }\n    .timestamp[_ngcontent-%COMP%] {\n      color: var(--text-secondary);\n      font-size: 0.76rem;\n      line-height: 1.35;\n    }\n    .level-chip[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      min-width: 64px;\n      padding: 0.2rem 0.55rem;\n      border-radius: 999px;\n      background: rgba(255, 255, 255, 0.06);\n      font-size: 0.72rem;\n      font-weight: 700;\n      letter-spacing: 0.05em;\n    }\n    pre[_ngcontent-%COMP%] {\n      margin: 0;\n      color: var(--text-primary);\n      white-space: pre-wrap;\n      word-break: break-word;\n      font-family: Consolas, \"Courier New\", monospace;\n      font-size: 0.82rem;\n      line-height: 1.55;\n    }\n    @media (max-width: 720px) {\n      .stream[_ngcontent-%COMP%] {\n        padding: 0.75rem;\n      }\n      .entry-meta[_ngcontent-%COMP%] {\n        display: grid;\n        justify-content: stretch;\n      }\n    }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LogsViewerComponent, [{
        type: Component,
        args: [{ selector: 'app-logs-viewer', standalone: true, imports: [NgFor, NgIf, EmptyStateComponent], template: `
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
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n    .streams {\n      display: grid;\n      gap: 1.1rem;\n      max-height: 980px;\n      overflow: auto;\n      padding: 0.1rem 0.2rem 0.1rem 0.1rem;\n    }\n    .stream {\n      display: grid;\n      gap: 0.8rem;\n      padding: 0.9rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(255, 255, 255, 0.025);\n    }\n    .labels {\n      display: flex;\n      gap: 0.45rem;\n      flex-wrap: wrap;\n    }\n    .entry {\n      padding: 0.72rem 0.82rem;\n      border: 1px solid var(--border-soft);\n      border-radius: calc(var(--radius-md) - 2px);\n      background: rgba(8, 14, 25, 0.46);\n    }\n    .entry.error {\n      border-color: rgba(255, 107, 107, 0.26);\n      background: rgba(255, 107, 107, 0.05);\n    }\n    .entry.warn {\n      border-color: rgba(255, 180, 84, 0.26);\n      background: rgba(255, 180, 84, 0.05);\n    }\n    .entry.info {\n      border-color: rgba(88, 166, 255, 0.16);\n    }\n    .entry-meta {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 0.75rem;\n      margin-bottom: 0.45rem;\n    }\n    .timestamp {\n      color: var(--text-secondary);\n      font-size: 0.76rem;\n      line-height: 1.35;\n    }\n    .level-chip {\n      display: inline-flex;\n      align-items: center;\n      justify-content: center;\n      min-width: 64px;\n      padding: 0.2rem 0.55rem;\n      border-radius: 999px;\n      background: rgba(255, 255, 255, 0.06);\n      font-size: 0.72rem;\n      font-weight: 700;\n      letter-spacing: 0.05em;\n    }\n    pre {\n      margin: 0;\n      color: var(--text-primary);\n      white-space: pre-wrap;\n      word-break: break-word;\n      font-family: Consolas, \"Courier New\", monospace;\n      font-size: 0.82rem;\n      line-height: 1.55;\n    }\n    @media (max-width: 720px) {\n      .stream {\n        padding: 0.75rem;\n      }\n      .entry-meta {\n        display: grid;\n        justify-content: stretch;\n      }\n    }\n  "] }]
    }], null, { streams: [{
            type: Input
        }] }); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(LogsViewerComponent, { className: "LogsViewerComponent", filePath: "src\\app\\shared\\components\\logs-viewer.component.ts", lineNumber: 118 }); })();
//# sourceMappingURL=logs-viewer.component.js.map
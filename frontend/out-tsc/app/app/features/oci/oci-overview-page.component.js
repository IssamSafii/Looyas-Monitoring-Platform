import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatePipe, DecimalPipe, NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import { StatCardComponent } from '../../shared/components/stat-card.component';
import { TimeSeriesChartComponent } from '../../shared/components/time-series-chart.component';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state.component';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton.component';
import { HealthBadgeComponent } from '../../shared/components/health-badge.component';
import * as i0 from "@angular/core";
import * as i1 from "../../core/services/oci.service";
import * as i2 from "../../core/services/time-range.service";
import * as i3 from "@angular/material/button";
import * as i4 from "@angular/material/form-field";
import * as i5 from "@angular/material/select";
import * as i6 from "@angular/material/core";
function OciOverviewPageComponent_mat_option_11_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 48);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const compartment_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", compartment_r1.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", compartment_r1.name, " (", compartment_r1.maskedId, ") ");
} }
function OciOverviewPageComponent_div_14_span_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1, "Chargement des compartments OCI...");
    i0.ɵɵelementEnd();
} }
function OciOverviewPageComponent_div_14_span_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "span");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.compartmentsMessage);
} }
function OciOverviewPageComponent_div_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 49);
    i0.ɵɵtemplate(1, OciOverviewPageComponent_div_14_span_1_Template, 2, 0, "span", 50)(2, OciOverviewPageComponent_div_14_span_2_Template, 2, 1, "span", 50);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.compartmentsLoading);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", !ctx_r1.compartmentsLoading && ctx_r1.compartmentsMessage);
} }
function OciOverviewPageComponent_app_loading_skeleton_28_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-skeleton", 51);
} if (rf & 2) {
    i0.ɵɵproperty("rows", 4);
} }
function OciOverviewPageComponent_app_empty_state_29_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 52);
} }
function OciOverviewPageComponent_app_error_state_30_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-error-state", 53);
    i0.ɵɵlistener("retry", function OciOverviewPageComponent_app_error_state_30_Template_app_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.reload()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", ctx_r1.healthState.message || "Impossible de verifier OCI.")("details", ctx_r1.healthState.details || "");
} }
function OciOverviewPageComponent_div_31_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 54)(1, "div", 55)(2, "span");
    i0.ɵɵtext(3, "Etat");
    i0.ɵɵelementEnd();
    i0.ɵɵelement(4, "app-health-badge", 56);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 55)(6, "span");
    i0.ɵɵtext(7, "Region");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "strong");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(10, "div", 55)(11, "span");
    i0.ɵɵtext(12, "Profil");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "strong");
    i0.ɵɵtext(14);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(15, "div", 55)(16, "span");
    i0.ɵɵtext(17, "Compartment");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "strong");
    i0.ɵɵtext(19);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(20, "div", 57);
    i0.ɵɵtext(21);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("status", ctx_r1.healthBadgeStatus);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((ctx_r1.healthState.data == null ? null : ctx_r1.healthState.data.region) || "-");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((ctx_r1.healthState.data == null ? null : ctx_r1.healthState.data.profile) || "-");
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate((ctx_r1.healthState.data == null ? null : ctx_r1.healthState.data.compartmentConfigured) ? "Configure" : "Absent");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(ctx_r1.healthState.data == null ? null : ctx_r1.healthState.data.message);
} }
function OciOverviewPageComponent_app_loading_skeleton_35_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-skeleton", 51);
} if (rf & 2) {
    i0.ɵɵproperty("rows", 5);
} }
function OciOverviewPageComponent_app_empty_state_36_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 58);
} }
function OciOverviewPageComponent_app_empty_state_37_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 59);
} }
function OciOverviewPageComponent_app_error_state_38_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-error-state", 53);
    i0.ɵɵlistener("retry", function OciOverviewPageComponent_app_error_state_38_Template_app_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.loadCompute()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", ctx_r1.computeState.message || "Impossible de charger les instances.")("details", ctx_r1.computeState.details || "");
} }
function OciOverviewPageComponent_div_39_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 62)(1, "div", 63)(2, "div")(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 57);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "span", 64);
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "div", 65)(10, "span");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "span");
    i0.ɵɵtext(15);
    i0.ɵɵpipe(16, "number");
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const instance_r5 = ctx.$implicit;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(instance_r5.displayName || instance_r5.maskedId);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate2("", instance_r5.shape, " - ", instance_r5.region, "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(instance_r5.lifecycleState);
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1("AD ", instance_r5.availabilityDomain || "-", "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("FD ", instance_r5.faultDomain || "-", "");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate1("CPU ", instance_r5.cpuCurrent == null ? "-" : i0.ɵɵpipeBind2(16, 7, instance_r5.cpuCurrent, "1.0-2") + " %", "");
} }
function OciOverviewPageComponent_div_39_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 60);
    i0.ɵɵtemplate(1, OciOverviewPageComponent_div_39_article_1_Template, 17, 10, "article", 61);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.topInstances);
} }
function OciOverviewPageComponent_app_loading_skeleton_43_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-skeleton", 51);
} if (rf & 2) {
    i0.ɵɵproperty("rows", 5);
} }
function OciOverviewPageComponent_app_empty_state_44_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 52);
} }
function OciOverviewPageComponent_app_empty_state_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 66);
} }
function OciOverviewPageComponent_app_error_state_46_Template(rf, ctx) { if (rf & 1) {
    const _r6 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-error-state", 53);
    i0.ɵɵlistener("retry", function OciOverviewPageComponent_app_error_state_46_Template_app_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r6); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.loadCpu()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", ctx_r1.cpuState.message || "Impossible de charger la metrique CPU.")("details", ctx_r1.cpuState.details || "");
} }
function OciOverviewPageComponent_app_time_series_chart_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-time-series-chart", 67);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("series", ctx_r1.cpuChartSeries);
} }
function OciOverviewPageComponent_app_loading_skeleton_51_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-skeleton", 51);
} if (rf & 2) {
    i0.ɵɵproperty("rows", 5);
} }
function OciOverviewPageComponent_app_empty_state_52_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 52);
} }
function OciOverviewPageComponent_app_empty_state_53_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 68);
} }
function OciOverviewPageComponent_app_error_state_54_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-error-state", 53);
    i0.ɵɵlistener("retry", function OciOverviewPageComponent_app_error_state_54_Template_app_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.loadMemory()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", ctx_r1.memoryState.message || "Impossible de charger la metrique memoire.")("details", ctx_r1.memoryState.details || "");
} }
function OciOverviewPageComponent_app_time_series_chart_55_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-time-series-chart", 67);
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("series", ctx_r1.memoryChartSeries);
} }
function OciOverviewPageComponent_app_loading_skeleton_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-skeleton", 51);
} if (rf & 2) {
    i0.ɵɵproperty("rows", 5);
} }
function OciOverviewPageComponent_app_empty_state_60_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 52);
} }
function OciOverviewPageComponent_app_empty_state_61_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 69);
} }
function OciOverviewPageComponent_app_error_state_62_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-error-state", 53);
    i0.ɵɵlistener("retry", function OciOverviewPageComponent_app_error_state_62_Template_app_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.loadNetwork()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", ctx_r1.networkState.message || "Impossible de charger le reseau OCI.")("details", ctx_r1.networkState.details || "");
} }
function OciOverviewPageComponent_div_63_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 70)(1, "div", 71)(2, "article", 72)(3, "div", 73);
    i0.ɵɵelement(4, "span", 74);
    i0.ɵɵelementStart(5, "span");
    i0.ɵɵtext(6, "Entrant");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(9, "article", 75)(10, "div", 73);
    i0.ɵɵelement(11, "span", 76);
    i0.ɵɵelementStart(12, "span");
    i0.ɵɵtext(13, "Sortant");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(14, "strong");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelement(16, "app-time-series-chart", 77);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(8);
    i0.ɵɵtextInterpolate(ctx_r1.networkInboundLabel);
    i0.ɵɵadvance(7);
    i0.ɵɵtextInterpolate(ctx_r1.networkOutboundLabel);
    i0.ɵɵadvance();
    i0.ɵɵproperty("series", ctx_r1.networkChartSeries)("palette", ctx_r1.networkPalette);
} }
function OciOverviewPageComponent_app_loading_skeleton_67_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-skeleton", 51);
} if (rf & 2) {
    i0.ɵɵproperty("rows", 6);
} }
function OciOverviewPageComponent_app_empty_state_68_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 52);
} }
function OciOverviewPageComponent_app_empty_state_69_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 78);
} }
function OciOverviewPageComponent_app_error_state_70_Template(rf, ctx) { if (rf & 1) {
    const _r9 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-error-state", 53);
    i0.ɵɵlistener("retry", function OciOverviewPageComponent_app_error_state_70_Template_app_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r9); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.loadLogs()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", ctx_r1.logsState.message || "Impossible de charger les logs OCI.")("details", ctx_r1.logsState.details || "");
} }
function OciOverviewPageComponent_div_71_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 81)(1, "div", 82)(2, "span", 64);
    i0.ɵɵtext(3);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span", 57);
    i0.ɵɵtext(5);
    i0.ɵɵpipe(6, "date");
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "strong");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "div", 57);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const log_r10 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(2);
    i0.ɵɵclassProp("warn-chip", ctx_r1.isWarning(log_r10))("error-chip", ctx_r1.isError(log_r10));
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.severityLabel(log_r10));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(6, 8, log_r10.timestamp, "short"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(log_r10.resourceName || log_r10.service || "OCI");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(log_r10.message || "Message absent");
} }
function OciOverviewPageComponent_div_71_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 79);
    i0.ɵɵtemplate(1, OciOverviewPageComponent_div_71_article_1_Template, 11, 11, "article", 80);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", ctx_r1.latestLogs);
} }
function OciOverviewPageComponent_app_loading_skeleton_75_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-skeleton", 51);
} if (rf & 2) {
    i0.ɵɵproperty("rows", 5);
} }
function OciOverviewPageComponent_app_empty_state_76_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 52);
} }
function OciOverviewPageComponent_app_empty_state_77_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 83);
} }
function OciOverviewPageComponent_app_error_state_78_Template(rf, ctx) { if (rf & 1) {
    const _r11 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-error-state", 53);
    i0.ɵɵlistener("retry", function OciOverviewPageComponent_app_error_state_78_Template_app_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r11); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.loadLogs()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", ctx_r1.logsState.message || "Impossible de charger les logs OCI.")("details", ctx_r1.logsState.details || "");
} }
function OciOverviewPageComponent_div_79_table_1_tr_14_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "td");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "td");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(8, "td");
    i0.ɵɵtext(9);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(10, "td");
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const log_r12 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(3, 5, log_r12.timestamp, "short"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(ctx_r1.severityLabel(log_r12));
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(log_r12.service || "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(log_r12.resourceName || "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(log_r12.message || "-");
} }
function OciOverviewPageComponent_div_79_table_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "table")(1, "thead")(2, "tr")(3, "th");
    i0.ɵɵtext(4, "Timestamp");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "th");
    i0.ɵɵtext(6, "Severity");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Service");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Ressource");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Message");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(13, "tbody");
    i0.ɵɵtemplate(14, OciOverviewPageComponent_div_79_table_1_tr_14_Template, 12, 8, "tr", 86);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(14);
    i0.ɵɵproperty("ngForOf", ctx_r1.recentErrorLogs);
} }
function OciOverviewPageComponent_div_79_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 87);
} }
function OciOverviewPageComponent_div_79_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 84);
    i0.ɵɵtemplate(1, OciOverviewPageComponent_div_79_table_1_Template, 15, 1, "table", 85)(2, OciOverviewPageComponent_div_79_ng_template_2_Template, 1, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const noAlertsTpl_r13 = i0.ɵɵreference(3);
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.recentErrorLogs.length)("ngIfElse", noAlertsTpl_r13);
} }
export class OciOverviewPageComponent {
    constructor(ociService, timeRangeService, cdr) {
        this.ociService = ociService;
        this.timeRangeService = timeRangeService;
        this.cdr = cdr;
        this.healthState = { state: 'loading' };
        this.computeState = { state: 'loading' };
        this.cpuState = { state: 'loading' };
        this.memoryState = { state: 'loading' };
        this.networkState = { state: 'loading' };
        this.logsState = { state: 'loading' };
        this.networkPalette = ['#4cc9f0', '#31b8e0', '#ffb454', '#ff9b3d'];
        this.compartmentOptions = [];
        this.selectedCompartmentId = null;
        this.compartmentsLoading = false;
        this.compartmentsMessage = '';
    }
    ngOnInit() {
        this.reload();
    }
    reload() {
        this.loadHealth();
        this.loadCompartments();
        this.loadCompute();
        this.loadCpu();
        this.loadMemory();
        this.loadNetwork();
        this.loadLogs();
    }
    loadHealth() {
        this.healthState = { state: 'loading' };
        this.ociService.health().subscribe({
            next: (response) => {
                this.healthState = response.status === 'NOT_CONFIGURED'
                    ? { state: 'not-configured', data: response, message: response.message }
                    : { state: 'ready', data: response };
                this.cdr.markForCheck();
            },
            error: (error) => {
                this.healthState = this.toFailureState(error, 'Impossible de verifier la connexion OCI.');
                this.cdr.markForCheck();
            }
        });
    }
    loadCompartments() {
        this.compartmentsLoading = true;
        this.compartmentsMessage = '';
        this.ociService.compartments().subscribe({
            next: (response) => {
                this.compartmentOptions = response.compartments || [];
                if (!this.selectedCompartmentId) {
                    this.selectedCompartmentId = response.configuredCompartmentId || this.compartmentOptions[0]?.id || null;
                }
                else if (!this.compartmentOptions.some((compartment) => compartment.id === this.selectedCompartmentId)) {
                    this.selectedCompartmentId = response.configuredCompartmentId || this.compartmentOptions[0]?.id || null;
                }
                this.compartmentsMessage = this.compartmentOptions.length
                    ? ''
                    : "Aucun compartment OCI accessible n'a ete retourne pour ce scope.";
                this.compartmentsLoading = false;
                this.cdr.markForCheck();
            },
            error: (error) => {
                const code = this.extractErrorCode(error);
                this.compartmentOptions = [];
                this.compartmentsMessage = code === 'OCI_NOT_CONFIGURED'
                    ? "La source OCI n'est pas encore configuree."
                    : this.extractErrorMessage(error, 'Impossible de lister les compartments OCI.');
                this.compartmentsLoading = false;
                this.cdr.markForCheck();
            }
        });
    }
    onCompartmentChange(compartmentId) {
        this.selectedCompartmentId = compartmentId;
        this.loadCompute();
        this.loadCpu();
        this.loadMemory();
        this.loadNetwork();
        this.loadLogs();
    }
    loadCompute() {
        this.computeState = { state: 'loading' };
        this.ociService.computeInstances(this.selectedCompartmentId).subscribe({
            next: (instances) => {
                this.computeState = instances.length ? { state: 'ready', data: instances } : { state: 'empty', data: [] };
                this.cdr.markForCheck();
            },
            error: (error) => {
                this.computeState = this.toFailureState(error, 'Impossible de charger les instances Compute.');
                this.cdr.markForCheck();
            }
        });
    }
    loadCpu() {
        this.loadMetricPanel('CpuUtilization[1m].mean()', 'oci_computeagent', (state) => {
            this.cpuState = state;
        });
    }
    loadMemory() {
        this.loadMetricPanel('MemoryUtilization[1m].mean()', 'oci_computeagent', (state) => {
            this.memoryState = state;
        });
    }
    loadNetwork() {
        this.loadMetricPanel('NetworksBytesIn[1m].mean()', 'oci_computeagent', (bytesInState) => {
            if (bytesInState.state !== 'ready') {
                this.networkState = bytesInState;
                this.cdr.markForCheck();
                return;
            }
            this.loadMetricPanel('NetworksBytesOut[1m].mean()', 'oci_computeagent', (bytesOutState) => {
                if (bytesOutState.state !== 'ready') {
                    this.networkState = bytesOutState;
                    this.cdr.markForCheck();
                    return;
                }
                const networkSeries = [
                    ...(bytesInState.data || []).map((series) => this.withNetworkDirection(series, 'in')),
                    ...(bytesOutState.data || []).map((series) => this.withNetworkDirection(series, 'out'))
                ];
                this.networkState = { state: 'ready', data: networkSeries };
                this.cdr.markForCheck();
            });
        });
    }
    loadLogs() {
        this.logsState = { state: 'loading' };
        const { from, to } = this.resolveRange();
        this.ociService.searchLogs({
            searchQuery: null,
            compartmentId: this.selectedCompartmentId,
            from,
            to,
            limit: 120
        }).subscribe({
            next: (response) => {
                this.logsState = response.logs.length ? { state: 'ready', data: response.logs } : { state: 'empty', data: [] };
                this.cdr.markForCheck();
            },
            error: (error) => {
                this.logsState = this.toFailureState(error, 'Impossible de charger les logs OCI.');
                this.cdr.markForCheck();
            }
        });
    }
    get healthCardValue() {
        if (this.healthState.state === 'ready') {
            return this.healthState.data?.status || '-';
        }
        if (this.healthState.state === 'not-configured') {
            return 'NOT_CONFIGURED';
        }
        if (this.healthState.state === 'error') {
            return 'ERROR';
        }
        return '-';
    }
    get healthBadgeStatus() {
        const status = this.healthState.data?.status;
        if (status === 'CONNECTED') {
            return 'CONNECTED';
        }
        if (status === 'NOT_CONFIGURED') {
            return 'UNKNOWN';
        }
        return status ? 'DISCONNECTED' : 'UNKNOWN';
    }
    get topInstances() {
        return (this.computeState.data || []).slice(0, 5);
    }
    get cpuChartSeries() {
        return this.toChartSeries(this.cpuState.data || []);
    }
    get memoryChartSeries() {
        return this.toChartSeries(this.memoryState.data || []);
    }
    get networkChartSeries() {
        return (this.networkState.data || []).map((item) => ({
            name: this.networkSeriesLabel(item),
            labels: item.dimensions,
            color: this.networkSeriesColor(item),
            points: item.points.map((point) => ({
                timestamp: point.timestamp,
                value: point.value == null ? null : this.bytesToMbit(point.value)
            }))
        }));
    }
    get latestLogs() {
        return (this.logsState.data || []).slice(0, 8);
    }
    get recentErrorLogs() {
        return (this.logsState.data || []).filter((log) => this.isWarning(log) || this.isError(log)).slice(0, 12);
    }
    get instancesCountLabel() {
        return this.computeState.state === 'ready' ? this.formatInteger((this.computeState.data || []).length) : '-';
    }
    get runningInstancesLabel() {
        if (this.computeState.state !== 'ready') {
            return '-';
        }
        return this.formatInteger((this.computeState.data || []).filter((instance) => instance.lifecycleState === 'RUNNING').length);
    }
    get cpuAverageLabel() {
        return this.averageMetricLabel(this.cpuState.data || [], '%');
    }
    get memoryAverageLabel() {
        return this.averageMetricLabel(this.memoryState.data || [], '%');
    }
    get networkTotalLabel() {
        if (this.networkState.state !== 'ready') {
            return '-';
        }
        const total = this.sumLatestNetworkValue();
        return total == null ? '-' : this.formatNetworkRate(total);
    }
    get networkInboundLabel() {
        const total = this.sumLatestNetworkValue('in');
        return total == null ? '-' : this.formatNetworkRate(total);
    }
    get networkOutboundLabel() {
        const total = this.sumLatestNetworkValue('out');
        return total == null ? '-' : this.formatNetworkRate(total);
    }
    get logsCountLabel() {
        return this.logsState.state === 'ready' ? this.formatInteger((this.logsState.data || []).length) : '-';
    }
    get recentErrorsCountLabel() {
        return this.logsState.state === 'ready' ? this.formatInteger(this.recentErrorLogs.length) : '-';
    }
    severityLabel(log) {
        return (log.severity || 'INFO').toUpperCase();
    }
    isWarning(log) {
        return this.severityLabel(log).includes('WARN');
    }
    isError(log) {
        return this.severityLabel(log).includes('ERROR');
    }
    loadMetricPanel(query, namespace, onResolved) {
        const payload = this.metricRequest(query, namespace);
        onResolved({ state: 'loading' });
        this.ociService.queryMetrics(payload).subscribe({
            next: (response) => {
                onResolved(response.series.length ? { state: 'ready', data: response.series } : { state: 'empty', data: [] });
                this.cdr.markForCheck();
            },
            error: (error) => {
                onResolved(this.toFailureState(error, `Impossible de charger ${query}.`));
                this.cdr.markForCheck();
            }
        });
    }
    metricRequest(query, namespace) {
        const { from, to } = this.resolveRange();
        return {
            compartmentId: this.selectedCompartmentId,
            namespace,
            query,
            from,
            to,
            includeSubcompartments: null
        };
    }
    resolveRange() {
        const end = new Date();
        const start = new Date(end.getTime() - this.timeRangeService.selected().seconds * 1000);
        return { from: start.toISOString(), to: end.toISOString() };
    }
    toChartSeries(series) {
        return series.map((item) => ({
            name: item.name,
            labels: item.dimensions,
            points: item.points
        }));
    }
    averageMetricLabel(series, unit) {
        if (!series.length) {
            return '-';
        }
        const values = series
            .map((item) => item.points.at(-1)?.value)
            .filter((value) => value != null);
        if (!values.length) {
            return '-';
        }
        const average = values.reduce((sum, value) => sum + value, 0) / values.length;
        return `${this.formatDecimal(average)} ${unit}`.trim();
    }
    formatInteger(value) {
        return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(value);
    }
    formatDecimal(value) {
        return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(value);
    }
    withNetworkDirection(series, direction) {
        return {
            ...series,
            metadata: {
                ...(series.metadata || {}),
                direction
            }
        };
    }
    networkSeriesLabel(series) {
        const direction = this.networkDirection(series);
        const baseName = series.name || series.dimensions['resourceDisplayName'] || series.dimensions['resourceId'] || 'OCI';
        if (direction === 'in') {
            return `Entrant - ${baseName}`;
        }
        if (direction === 'out') {
            return `Sortant - ${baseName}`;
        }
        return baseName;
    }
    networkSeriesColor(series) {
        return this.networkDirection(series) === 'in' ? '#4cc9f0' : '#ffb454';
    }
    networkDirection(series) {
        const direction = series.metadata?.['direction'];
        if (direction === 'in' || direction === 'out') {
            return direction;
        }
        return 'unknown';
    }
    sumLatestNetworkValue(direction) {
        const values = (this.networkState.data || [])
            .filter((series) => !direction || this.networkDirection(series) === direction)
            .map((series) => series.points.at(-1)?.value)
            .filter((value) => value != null);
        if (!values.length) {
            return null;
        }
        return values.reduce((sum, value) => sum + value, 0);
    }
    formatNetworkRate(bytesValue) {
        const mbitValue = this.bytesToMbit(bytesValue);
        return `${this.formatDecimal(mbitValue)} Mbit`;
    }
    bytesToMbit(value) {
        return (value * 8) / (1024 ** 2);
    }
    toFailureState(error, fallback) {
        const code = this.extractErrorCode(error);
        if (code === 'OCI_NOT_CONFIGURED') {
            return { state: 'not-configured', message: "La source OCI n'est pas encore configuree." };
        }
        return {
            state: 'error',
            message: this.extractErrorMessage(error, fallback),
            details: this.extractErrorDetails(error)
        };
    }
    extractErrorCode(error) {
        if (typeof error === 'object' && error !== null && 'error' in error) {
            const payload = error.error;
            return payload?.code || '';
        }
        return '';
    }
    extractErrorMessage(error, fallback) {
        if (typeof error === 'object' && error !== null && 'error' in error) {
            const payload = error.error;
            if (payload?.message) {
                return payload.message;
            }
        }
        return fallback;
    }
    extractErrorDetails(error) {
        try {
            return typeof error === 'string' ? error : JSON.stringify(error, null, 2);
        }
        catch {
            return '';
        }
    }
    static { this.ɵfac = function OciOverviewPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OciOverviewPageComponent)(i0.ɵɵdirectiveInject(i1.OciService), i0.ɵɵdirectiveInject(i2.TimeRangeService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OciOverviewPageComponent, selectors: [["app-oci-overview-page"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 80, vars: 69, consts: [["noAlertsTpl", ""], [1, "page-header"], [1, "page-title"], [1, "page-subtitle"], [1, "header-actions"], ["subscriptSizing", "dynamic", 1, "compartment-select"], [3, "valueChange", "value", "disabled"], [3, "value", 4, "ngFor", "ngForOf"], ["mat-stroked-button", "", "type", "button", 3, "click"], ["class", "header-hint", 4, "ngIf"], [1, "grid-tiles"], ["title", "Connexion OCI", "description", "Etat courant de la source OCI.", "unit", "", 3, "value", "loading", "noData"], ["title", "Instances", "description", "Instances Compute visibles.", "unit", "instances", 3, "value", "loading", "noData"], ["title", "Running", "description", "Instances dans l'etat RUNNING.", "unit", "running", 3, "value", "loading", "noData"], ["title", "CPU moyen", "description", "CpuUtilization moyen sur la periode.", "unit", "%", 3, "value", "loading", "noData"], ["title", "Memoire moyenne", "description", "MemoryUtilization moyen sur la periode.", "unit", "%", 3, "value", "loading", "noData"], ["title", "Trafic reseau", "description", "Derniere mesure combinee entrant + sortant.", "unit", "Mbit", 3, "value", "loading", "noData"], ["title", "Logs OCI", "description", "Nombre de logs recents recuperes.", "unit", "logs", 3, "value", "loading", "noData"], ["title", "Erreurs recentes", "description", "Logs ERROR ou WARN dans la periode.", "unit", "alerts", 3, "value", "loading", "noData"], [1, "section-grid", "overview-grid"], [1, "span-4"], ["title", "Statut OCI", "subtitle", "Verification backend de la configuration et de la connexion."], [3, "ngSwitch"], [3, "rows", 4, "ngSwitchCase"], ["title", "OCI non configure", "description", "La source OCI n'est pas encore configuree.", 4, "ngSwitchCase"], [3, "message", "details", "retry", 4, "ngSwitchCase"], ["class", "health-card", 4, "ngSwitchCase"], [1, "span-8"], ["title", "Instances Compute", "subtitle", "Inventaire rapide des instances OCI accessibles."], ["title", "OCI non configure", "description", "Configure OCI pour afficher les instances Compute.", 4, "ngSwitchCase"], ["title", "Aucune instance visible", "description", "Aucune instance Compute n'a ete retournee pour ce compartment.", 4, "ngSwitchCase"], ["class", "instance-list", 4, "ngSwitchCase"], [1, "span-6"], ["title", "CPU OCI", "subtitle", "CpuUtilization[1m].mean()"], ["title", "Aucune donnee CPU", "description", "CpuUtilization n'est pas disponible sur cette periode.", 4, "ngSwitchCase"], ["unit", "%", 3, "series", 4, "ngSwitchCase"], ["title", "Memoire OCI", "subtitle", "MemoryUtilization[1m].mean()"], ["title", "Aucune donnee memoire", "description", "MemoryUtilization n'est pas disponible sur cette periode.", 4, "ngSwitchCase"], ["title", "Reseau OCI", "subtitle", "Entrant et sortant separes, convertis dans une unite reseau lisible."], ["title", "Aucune donnee reseau", "description", "Aucune serie reseau OCI n'a ete retournee.", 4, "ngSwitchCase"], ["class", "network-panel", 4, "ngSwitchCase"], ["title", "Derniers logs OCI", "subtitle", "Flux recent issu de OCI Logging Search."], ["title", "Aucun log recent", "description", "OCI n'a retourne aucun log sur la periode active.", 4, "ngSwitchCase"], ["class", "log-list", 4, "ngSwitchCase"], [1, "span-12"], ["title", "Erreurs recentes", "subtitle", "Warnings et erreurs extraits des logs OCI."], ["title", "Aucune alerte recente", "description", "Aucun WARNING ou ERROR n'a ete remonte sur la periode active.", 4, "ngSwitchCase"], ["class", "alerts-table-wrapper", 4, "ngSwitchCase"], [3, "value"], [1, "header-hint"], [4, "ngIf"], [3, "rows"], ["title", "OCI non configure", "description", "La source OCI n'est pas encore configuree."], [3, "retry", "message", "details"], [1, "health-card"], [1, "health-row"], [3, "status"], [1, "muted"], ["title", "OCI non configure", "description", "Configure OCI pour afficher les instances Compute."], ["title", "Aucune instance visible", "description", "Aucune instance Compute n'a ete retournee pour ce compartment."], [1, "instance-list"], ["class", "instance-card", 4, "ngFor", "ngForOf"], [1, "instance-card"], [1, "instance-head"], [1, "chip"], [1, "instance-meta"], ["title", "Aucune donnee CPU", "description", "CpuUtilization n'est pas disponible sur cette periode."], ["unit", "%", 3, "series"], ["title", "Aucune donnee memoire", "description", "MemoryUtilization n'est pas disponible sur cette periode."], ["title", "Aucune donnee reseau", "description", "Aucune serie reseau OCI n'a ete retournee."], [1, "network-panel"], [1, "network-summary"], [1, "network-summary-card", "network-in"], [1, "network-summary-label"], [1, "network-dot", "network-in-dot"], [1, "network-summary-card", "network-out"], [1, "network-dot", "network-out-dot"], ["unit", "Mbit", 3, "series", "palette"], ["title", "Aucun log recent", "description", "OCI n'a retourne aucun log sur la periode active."], [1, "log-list"], ["class", "log-card", 4, "ngFor", "ngForOf"], [1, "log-card"], [1, "log-head"], ["title", "Aucune alerte recente", "description", "Aucun WARNING ou ERROR n'a ete remonte sur la periode active."], [1, "alerts-table-wrapper"], [4, "ngIf", "ngIfElse"], [4, "ngFor", "ngForOf"], ["title", "Aucune alerte recente", "description", "Les logs OCI recuperes ne contiennent pas de WARNING ou ERROR."]], template: function OciOverviewPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 1)(1, "div")(2, "h1", 2);
            i0.ɵɵtext(3, "OCI Cloud");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 3);
            i0.ɵɵtext(5, "Overview OCI en lecture seule, sans exposer les credentials au frontend.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "div", 4)(7, "mat-form-field", 5)(8, "mat-label");
            i0.ɵɵtext(9, "Compartment");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "mat-select", 6);
            i0.ɵɵlistener("valueChange", function OciOverviewPageComponent_Template_mat_select_valueChange_10_listener($event) { return ctx.onCompartmentChange($event); });
            i0.ɵɵtemplate(11, OciOverviewPageComponent_mat_option_11_Template, 2, 3, "mat-option", 7);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(12, "button", 8);
            i0.ɵɵlistener("click", function OciOverviewPageComponent_Template_button_click_12_listener() { return ctx.reload(); });
            i0.ɵɵtext(13, "Actualiser");
            i0.ɵɵelementEnd()()();
            i0.ɵɵtemplate(14, OciOverviewPageComponent_div_14_Template, 3, 2, "div", 9);
            i0.ɵɵelementStart(15, "div", 10);
            i0.ɵɵelement(16, "app-stat-card", 11)(17, "app-stat-card", 12)(18, "app-stat-card", 13)(19, "app-stat-card", 14)(20, "app-stat-card", 15)(21, "app-stat-card", 16)(22, "app-stat-card", 17)(23, "app-stat-card", 18);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(24, "div", 19)(25, "div", 20)(26, "app-panel-container", 21);
            i0.ɵɵelementContainerStart(27, 22);
            i0.ɵɵtemplate(28, OciOverviewPageComponent_app_loading_skeleton_28_Template, 1, 1, "app-loading-skeleton", 23)(29, OciOverviewPageComponent_app_empty_state_29_Template, 1, 0, "app-empty-state", 24)(30, OciOverviewPageComponent_app_error_state_30_Template, 1, 2, "app-error-state", 25)(31, OciOverviewPageComponent_div_31_Template, 22, 5, "div", 26);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(32, "div", 27)(33, "app-panel-container", 28);
            i0.ɵɵelementContainerStart(34, 22);
            i0.ɵɵtemplate(35, OciOverviewPageComponent_app_loading_skeleton_35_Template, 1, 1, "app-loading-skeleton", 23)(36, OciOverviewPageComponent_app_empty_state_36_Template, 1, 0, "app-empty-state", 29)(37, OciOverviewPageComponent_app_empty_state_37_Template, 1, 0, "app-empty-state", 30)(38, OciOverviewPageComponent_app_error_state_38_Template, 1, 2, "app-error-state", 25)(39, OciOverviewPageComponent_div_39_Template, 2, 1, "div", 31);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(40, "div", 32)(41, "app-panel-container", 33);
            i0.ɵɵelementContainerStart(42, 22);
            i0.ɵɵtemplate(43, OciOverviewPageComponent_app_loading_skeleton_43_Template, 1, 1, "app-loading-skeleton", 23)(44, OciOverviewPageComponent_app_empty_state_44_Template, 1, 0, "app-empty-state", 24)(45, OciOverviewPageComponent_app_empty_state_45_Template, 1, 0, "app-empty-state", 34)(46, OciOverviewPageComponent_app_error_state_46_Template, 1, 2, "app-error-state", 25)(47, OciOverviewPageComponent_app_time_series_chart_47_Template, 1, 1, "app-time-series-chart", 35);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(48, "div", 32)(49, "app-panel-container", 36);
            i0.ɵɵelementContainerStart(50, 22);
            i0.ɵɵtemplate(51, OciOverviewPageComponent_app_loading_skeleton_51_Template, 1, 1, "app-loading-skeleton", 23)(52, OciOverviewPageComponent_app_empty_state_52_Template, 1, 0, "app-empty-state", 24)(53, OciOverviewPageComponent_app_empty_state_53_Template, 1, 0, "app-empty-state", 37)(54, OciOverviewPageComponent_app_error_state_54_Template, 1, 2, "app-error-state", 25)(55, OciOverviewPageComponent_app_time_series_chart_55_Template, 1, 1, "app-time-series-chart", 35);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(56, "div", 32)(57, "app-panel-container", 38);
            i0.ɵɵelementContainerStart(58, 22);
            i0.ɵɵtemplate(59, OciOverviewPageComponent_app_loading_skeleton_59_Template, 1, 1, "app-loading-skeleton", 23)(60, OciOverviewPageComponent_app_empty_state_60_Template, 1, 0, "app-empty-state", 24)(61, OciOverviewPageComponent_app_empty_state_61_Template, 1, 0, "app-empty-state", 39)(62, OciOverviewPageComponent_app_error_state_62_Template, 1, 2, "app-error-state", 25)(63, OciOverviewPageComponent_div_63_Template, 17, 4, "div", 40);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(64, "div", 32)(65, "app-panel-container", 41);
            i0.ɵɵelementContainerStart(66, 22);
            i0.ɵɵtemplate(67, OciOverviewPageComponent_app_loading_skeleton_67_Template, 1, 1, "app-loading-skeleton", 23)(68, OciOverviewPageComponent_app_empty_state_68_Template, 1, 0, "app-empty-state", 24)(69, OciOverviewPageComponent_app_empty_state_69_Template, 1, 0, "app-empty-state", 42)(70, OciOverviewPageComponent_app_error_state_70_Template, 1, 2, "app-error-state", 25)(71, OciOverviewPageComponent_div_71_Template, 2, 1, "div", 43);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(72, "div", 44)(73, "app-panel-container", 45);
            i0.ɵɵelementContainerStart(74, 22);
            i0.ɵɵtemplate(75, OciOverviewPageComponent_app_loading_skeleton_75_Template, 1, 1, "app-loading-skeleton", 23)(76, OciOverviewPageComponent_app_empty_state_76_Template, 1, 0, "app-empty-state", 24)(77, OciOverviewPageComponent_app_empty_state_77_Template, 1, 0, "app-empty-state", 46)(78, OciOverviewPageComponent_app_error_state_78_Template, 1, 2, "app-error-state", 25)(79, OciOverviewPageComponent_div_79_Template, 4, 2, "div", 47);
            i0.ɵɵelementContainerEnd();
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(10);
            i0.ɵɵproperty("value", ctx.selectedCompartmentId)("disabled", ctx.compartmentsLoading || !ctx.compartmentOptions.length);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngForOf", ctx.compartmentOptions);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.compartmentsLoading || ctx.compartmentsMessage);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("value", ctx.healthCardValue)("loading", ctx.healthState.state === "loading")("noData", ctx.healthState.state === "not-configured");
            i0.ɵɵadvance();
            i0.ɵɵproperty("value", ctx.instancesCountLabel)("loading", ctx.computeState.state === "loading")("noData", ctx.computeState.state !== "ready");
            i0.ɵɵadvance();
            i0.ɵɵproperty("value", ctx.runningInstancesLabel)("loading", ctx.computeState.state === "loading")("noData", ctx.computeState.state !== "ready");
            i0.ɵɵadvance();
            i0.ɵɵproperty("value", ctx.cpuAverageLabel)("loading", ctx.cpuState.state === "loading")("noData", ctx.cpuState.state !== "ready");
            i0.ɵɵadvance();
            i0.ɵɵproperty("value", ctx.memoryAverageLabel)("loading", ctx.memoryState.state === "loading")("noData", ctx.memoryState.state !== "ready");
            i0.ɵɵadvance();
            i0.ɵɵproperty("value", ctx.networkTotalLabel)("loading", ctx.networkState.state === "loading")("noData", ctx.networkState.state !== "ready");
            i0.ɵɵadvance();
            i0.ɵɵproperty("value", ctx.logsCountLabel)("loading", ctx.logsState.state === "loading")("noData", ctx.logsState.state !== "ready");
            i0.ɵɵadvance();
            i0.ɵɵproperty("value", ctx.recentErrorsCountLabel)("loading", ctx.logsState.state === "loading")("noData", ctx.logsState.state !== "ready");
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngSwitch", ctx.healthState.state);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "loading");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "not-configured");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "error");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "ready");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngSwitch", ctx.computeState.state);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "loading");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "not-configured");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "empty");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "error");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "ready");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngSwitch", ctx.cpuState.state);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "loading");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "not-configured");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "empty");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "error");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "ready");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngSwitch", ctx.memoryState.state);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "loading");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "not-configured");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "empty");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "error");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "ready");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngSwitch", ctx.networkState.state);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "loading");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "not-configured");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "empty");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "error");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "ready");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngSwitch", ctx.logsState.state);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "loading");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "not-configured");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "empty");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "error");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "ready");
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngSwitch", ctx.logsState.state);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "loading");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "not-configured");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "empty");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "error");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngSwitchCase", "ready");
        } }, dependencies: [NgIf,
            NgFor,
            NgSwitch,
            NgSwitchCase,
            DatePipe,
            DecimalPipe,
            MatButtonModule, i3.MatButton, MatFormFieldModule, i4.MatFormField, i4.MatLabel, MatSelectModule, i5.MatSelect, i6.MatOption, PanelContainerComponent,
            StatCardComponent,
            TimeSeriesChartComponent,
            EmptyStateComponent,
            ErrorStateComponent,
            LoadingSkeletonComponent,
            HealthBadgeComponent], styles: [".header-actions[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.9rem;\n    }\n    .compartment-select[_ngcontent-%COMP%] {\n      min-width: 320px;\n    }\n    .header-hint[_ngcontent-%COMP%] {\n      margin: -0.5rem 0 1rem;\n      color: var(--text-secondary);\n      font-size: 0.85rem;\n    }\n    .overview-grid[_ngcontent-%COMP%] { align-items: start; }\n    .health-card[_ngcontent-%COMP%], \n   .instance-list[_ngcontent-%COMP%], \n   .log-list[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.8rem;\n    }\n    .network-panel[_ngcontent-%COMP%], \n   .network-summary[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.8rem;\n    }\n    .network-summary[_ngcontent-%COMP%] {\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n    }\n    .network-summary-card[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.35rem;\n      padding: 0.9rem 0.95rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(255, 255, 255, 0.03);\n    }\n    .network-summary-label[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      color: var(--text-secondary);\n      font-size: 0.84rem;\n    }\n    .network-dot[_ngcontent-%COMP%] {\n      width: 0.65rem;\n      height: 0.65rem;\n      border-radius: 999px;\n      display: inline-block;\n    }\n    .network-in[_ngcontent-%COMP%] {\n      border-color: rgba(76, 201, 240, 0.24);\n    }\n    .network-out[_ngcontent-%COMP%] {\n      border-color: rgba(255, 180, 84, 0.24);\n    }\n    .network-in-dot[_ngcontent-%COMP%] {\n      background: #4cc9f0;\n    }\n    .network-out-dot[_ngcontent-%COMP%] {\n      background: #ffb454;\n    }\n    .health-row[_ngcontent-%COMP%], \n   .instance-head[_ngcontent-%COMP%], \n   .log-head[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 0.75rem;\n    }\n    .instance-card[_ngcontent-%COMP%], \n   .log-card[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.45rem;\n      padding: 0.95rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(255, 255, 255, 0.03);\n    }\n    .instance-meta[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.75rem;\n      color: var(--text-secondary);\n      font-size: 0.82rem;\n    }\n    .alerts-table-wrapper[_ngcontent-%COMP%] {\n      overflow: auto;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n    }\n    table[_ngcontent-%COMP%] {\n      width: 100%;\n      border-collapse: collapse;\n    }\n    th[_ngcontent-%COMP%], \n   td[_ngcontent-%COMP%] {\n      padding: 0.85rem 0.95rem;\n      text-align: left;\n      vertical-align: top;\n      border-bottom: 1px solid var(--border-soft);\n    }\n    th[_ngcontent-%COMP%] {\n      color: var(--text-secondary);\n      font-weight: 700;\n      background: rgba(255, 255, 255, 0.02);\n    }\n    .warn-chip[_ngcontent-%COMP%] {\n      border-color: rgba(255, 180, 84, 0.28);\n      background: rgba(255, 180, 84, 0.1);\n    }\n    .error-chip[_ngcontent-%COMP%] {\n      border-color: rgba(255, 107, 107, 0.28);\n      background: rgba(255, 107, 107, 0.1);\n    }\n    @media (max-width: 900px) {\n      .header-actions[_ngcontent-%COMP%] {\n        width: 100%;\n        flex-wrap: wrap;\n      }\n      .compartment-select[_ngcontent-%COMP%] {\n        width: 100%;\n        min-width: 0;\n      }\n      .network-summary[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n      }\n    }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OciOverviewPageComponent, [{
        type: Component,
        args: [{ selector: 'app-oci-overview-page', standalone: true, imports: [
                    NgIf,
                    NgFor,
                    NgSwitch,
                    NgSwitchCase,
                    DatePipe,
                    DecimalPipe,
                    MatButtonModule,
                    MatFormFieldModule,
                    MatSelectModule,
                    PanelContainerComponent,
                    StatCardComponent,
                    TimeSeriesChartComponent,
                    EmptyStateComponent,
                    ErrorStateComponent,
                    LoadingSkeletonComponent,
                    HealthBadgeComponent
                ], template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">OCI Cloud</h1>
        <div class="page-subtitle">Overview OCI en lecture seule, sans exposer les credentials au frontend.</div>
      </div>
      <div class="header-actions">
        <mat-form-field subscriptSizing="dynamic" class="compartment-select">
          <mat-label>Compartment</mat-label>
          <mat-select [value]="selectedCompartmentId" [disabled]="compartmentsLoading || !compartmentOptions.length" (valueChange)="onCompartmentChange($event)">
            <mat-option *ngFor="let compartment of compartmentOptions" [value]="compartment.id">
              {{ compartment.name }} ({{ compartment.maskedId }})
            </mat-option>
          </mat-select>
        </mat-form-field>
        <button mat-stroked-button type="button" (click)="reload()">Actualiser</button>
      </div>
    </div>
    <div class="header-hint" *ngIf="compartmentsLoading || compartmentsMessage">
      <span *ngIf="compartmentsLoading">Chargement des compartments OCI...</span>
      <span *ngIf="!compartmentsLoading && compartmentsMessage">{{ compartmentsMessage }}</span>
    </div>

    <div class="grid-tiles">
      <app-stat-card title="Connexion OCI" description="Etat courant de la source OCI." [value]="healthCardValue" unit="" [loading]="healthState.state === 'loading'" [noData]="healthState.state === 'not-configured'"></app-stat-card>
      <app-stat-card title="Instances" description="Instances Compute visibles." [value]="instancesCountLabel" unit="instances" [loading]="computeState.state === 'loading'" [noData]="computeState.state !== 'ready'"></app-stat-card>
      <app-stat-card title="Running" description="Instances dans l'etat RUNNING." [value]="runningInstancesLabel" unit="running" [loading]="computeState.state === 'loading'" [noData]="computeState.state !== 'ready'"></app-stat-card>
      <app-stat-card title="CPU moyen" description="CpuUtilization moyen sur la periode." [value]="cpuAverageLabel" unit="%" [loading]="cpuState.state === 'loading'" [noData]="cpuState.state !== 'ready'"></app-stat-card>
      <app-stat-card title="Memoire moyenne" description="MemoryUtilization moyen sur la periode." [value]="memoryAverageLabel" unit="%" [loading]="memoryState.state === 'loading'" [noData]="memoryState.state !== 'ready'"></app-stat-card>
      <app-stat-card title="Trafic reseau" description="Derniere mesure combinee entrant + sortant." [value]="networkTotalLabel" unit="Mbit" [loading]="networkState.state === 'loading'" [noData]="networkState.state !== 'ready'"></app-stat-card>
      <app-stat-card title="Logs OCI" description="Nombre de logs recents recuperes." [value]="logsCountLabel" unit="logs" [loading]="logsState.state === 'loading'" [noData]="logsState.state !== 'ready'"></app-stat-card>
      <app-stat-card title="Erreurs recentes" description="Logs ERROR ou WARN dans la periode." [value]="recentErrorsCountLabel" unit="alerts" [loading]="logsState.state === 'loading'" [noData]="logsState.state !== 'ready'"></app-stat-card>
    </div>

    <div class="section-grid overview-grid">
      <div class="span-4">
        <app-panel-container title="Statut OCI" subtitle="Verification backend de la configuration et de la connexion.">
          <ng-container [ngSwitch]="healthState.state">
            <app-loading-skeleton *ngSwitchCase="'loading'" [rows]="4"></app-loading-skeleton>

            <app-empty-state *ngSwitchCase="'not-configured'" title="OCI non configure" description="La source OCI n'est pas encore configuree."></app-empty-state>

            <app-error-state *ngSwitchCase="'error'" [message]="healthState.message || 'Impossible de verifier OCI.'" [details]="healthState.details || ''" (retry)="reload()"></app-error-state>

            <div *ngSwitchCase="'ready'" class="health-card">
              <div class="health-row">
                <span>Etat</span>
                <app-health-badge [status]="healthBadgeStatus"></app-health-badge>
              </div>
              <div class="health-row">
                <span>Region</span>
                <strong>{{ healthState.data?.region || '-' }}</strong>
              </div>
              <div class="health-row">
                <span>Profil</span>
                <strong>{{ healthState.data?.profile || '-' }}</strong>
              </div>
              <div class="health-row">
                <span>Compartment</span>
                <strong>{{ healthState.data?.compartmentConfigured ? 'Configure' : 'Absent' }}</strong>
              </div>
              <div class="muted">{{ healthState.data?.message }}</div>
            </div>
          </ng-container>
        </app-panel-container>
      </div>

      <div class="span-8">
        <app-panel-container title="Instances Compute" subtitle="Inventaire rapide des instances OCI accessibles.">
          <ng-container [ngSwitch]="computeState.state">
            <app-loading-skeleton *ngSwitchCase="'loading'" [rows]="5"></app-loading-skeleton>
            <app-empty-state *ngSwitchCase="'not-configured'" title="OCI non configure" description="Configure OCI pour afficher les instances Compute."></app-empty-state>
            <app-empty-state *ngSwitchCase="'empty'" title="Aucune instance visible" description="Aucune instance Compute n'a ete retournee pour ce compartment."></app-empty-state>
            <app-error-state *ngSwitchCase="'error'" [message]="computeState.message || 'Impossible de charger les instances.'" [details]="computeState.details || ''" (retry)="loadCompute()"></app-error-state>

            <div *ngSwitchCase="'ready'" class="instance-list">
              <article *ngFor="let instance of topInstances" class="instance-card">
                <div class="instance-head">
                  <div>
                    <strong>{{ instance.displayName || instance.maskedId }}</strong>
                    <div class="muted">{{ instance.shape }} - {{ instance.region }}</div>
                  </div>
                  <span class="chip">{{ instance.lifecycleState }}</span>
                </div>
                <div class="instance-meta">
                  <span>AD {{ instance.availabilityDomain || '-' }}</span>
                  <span>FD {{ instance.faultDomain || '-' }}</span>
                  <span>CPU {{ instance.cpuCurrent == null ? '-' : (instance.cpuCurrent | number:'1.0-2') + ' %' }}</span>
                </div>
              </article>
            </div>
          </ng-container>
        </app-panel-container>
      </div>

      <div class="span-6">
        <app-panel-container title="CPU OCI" subtitle="CpuUtilization[1m].mean()">
          <ng-container [ngSwitch]="cpuState.state">
            <app-loading-skeleton *ngSwitchCase="'loading'" [rows]="5"></app-loading-skeleton>
            <app-empty-state *ngSwitchCase="'not-configured'" title="OCI non configure" description="La source OCI n'est pas encore configuree."></app-empty-state>
            <app-empty-state *ngSwitchCase="'empty'" title="Aucune donnee CPU" description="CpuUtilization n'est pas disponible sur cette periode."></app-empty-state>
            <app-error-state *ngSwitchCase="'error'" [message]="cpuState.message || 'Impossible de charger la metrique CPU.'" [details]="cpuState.details || ''" (retry)="loadCpu()"></app-error-state>
            <app-time-series-chart *ngSwitchCase="'ready'" [series]="cpuChartSeries" unit="%"></app-time-series-chart>
          </ng-container>
        </app-panel-container>
      </div>

      <div class="span-6">
        <app-panel-container title="Memoire OCI" subtitle="MemoryUtilization[1m].mean()">
          <ng-container [ngSwitch]="memoryState.state">
            <app-loading-skeleton *ngSwitchCase="'loading'" [rows]="5"></app-loading-skeleton>
            <app-empty-state *ngSwitchCase="'not-configured'" title="OCI non configure" description="La source OCI n'est pas encore configuree."></app-empty-state>
            <app-empty-state *ngSwitchCase="'empty'" title="Aucune donnee memoire" description="MemoryUtilization n'est pas disponible sur cette periode."></app-empty-state>
            <app-error-state *ngSwitchCase="'error'" [message]="memoryState.message || 'Impossible de charger la metrique memoire.'" [details]="memoryState.details || ''" (retry)="loadMemory()"></app-error-state>
            <app-time-series-chart *ngSwitchCase="'ready'" [series]="memoryChartSeries" unit="%"></app-time-series-chart>
          </ng-container>
        </app-panel-container>
      </div>

      <div class="span-6">
        <app-panel-container title="Reseau OCI" subtitle="Entrant et sortant separes, convertis dans une unite reseau lisible.">
          <ng-container [ngSwitch]="networkState.state">
            <app-loading-skeleton *ngSwitchCase="'loading'" [rows]="5"></app-loading-skeleton>
            <app-empty-state *ngSwitchCase="'not-configured'" title="OCI non configure" description="La source OCI n'est pas encore configuree."></app-empty-state>
            <app-empty-state *ngSwitchCase="'empty'" title="Aucune donnee reseau" description="Aucune serie reseau OCI n'a ete retournee."></app-empty-state>
            <app-error-state *ngSwitchCase="'error'" [message]="networkState.message || 'Impossible de charger le reseau OCI.'" [details]="networkState.details || ''" (retry)="loadNetwork()"></app-error-state>
            <div *ngSwitchCase="'ready'" class="network-panel">
              <div class="network-summary">
                <article class="network-summary-card network-in">
                  <div class="network-summary-label">
                    <span class="network-dot network-in-dot"></span>
                    <span>Entrant</span>
                  </div>
                  <strong>{{ networkInboundLabel }}</strong>
                </article>
                <article class="network-summary-card network-out">
                  <div class="network-summary-label">
                    <span class="network-dot network-out-dot"></span>
                    <span>Sortant</span>
                  </div>
                  <strong>{{ networkOutboundLabel }}</strong>
                </article>
              </div>
              <app-time-series-chart [series]="networkChartSeries" unit="Mbit" [palette]="networkPalette"></app-time-series-chart>
            </div>
          </ng-container>
        </app-panel-container>
      </div>

      <div class="span-6">
        <app-panel-container title="Derniers logs OCI" subtitle="Flux recent issu de OCI Logging Search.">
          <ng-container [ngSwitch]="logsState.state">
            <app-loading-skeleton *ngSwitchCase="'loading'" [rows]="6"></app-loading-skeleton>
            <app-empty-state *ngSwitchCase="'not-configured'" title="OCI non configure" description="La source OCI n'est pas encore configuree."></app-empty-state>
            <app-empty-state *ngSwitchCase="'empty'" title="Aucun log recent" description="OCI n'a retourne aucun log sur la periode active."></app-empty-state>
            <app-error-state *ngSwitchCase="'error'" [message]="logsState.message || 'Impossible de charger les logs OCI.'" [details]="logsState.details || ''" (retry)="loadLogs()"></app-error-state>

            <div *ngSwitchCase="'ready'" class="log-list">
              <article *ngFor="let log of latestLogs" class="log-card">
                <div class="log-head">
                  <span class="chip" [class.warn-chip]="isWarning(log)" [class.error-chip]="isError(log)">{{ severityLabel(log) }}</span>
                  <span class="muted">{{ log.timestamp | date:'short' }}</span>
                </div>
                <strong>{{ log.resourceName || log.service || 'OCI' }}</strong>
                <div class="muted">{{ log.message || 'Message absent' }}</div>
              </article>
            </div>
          </ng-container>
        </app-panel-container>
      </div>

      <div class="span-12">
        <app-panel-container title="Erreurs recentes" subtitle="Warnings et erreurs extraits des logs OCI.">
          <ng-container [ngSwitch]="logsState.state">
            <app-loading-skeleton *ngSwitchCase="'loading'" [rows]="5"></app-loading-skeleton>
            <app-empty-state *ngSwitchCase="'not-configured'" title="OCI non configure" description="La source OCI n'est pas encore configuree."></app-empty-state>
            <app-empty-state *ngSwitchCase="'empty'" title="Aucune alerte recente" description="Aucun WARNING ou ERROR n'a ete remonte sur la periode active."></app-empty-state>
            <app-error-state *ngSwitchCase="'error'" [message]="logsState.message || 'Impossible de charger les logs OCI.'" [details]="logsState.details || ''" (retry)="loadLogs()"></app-error-state>

            <div *ngSwitchCase="'ready'" class="alerts-table-wrapper">
              <table *ngIf="recentErrorLogs.length; else noAlertsTpl">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Severity</th>
                    <th>Service</th>
                    <th>Ressource</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let log of recentErrorLogs">
                    <td>{{ log.timestamp | date:'short' }}</td>
                    <td>{{ severityLabel(log) }}</td>
                    <td>{{ log.service || '-' }}</td>
                    <td>{{ log.resourceName || '-' }}</td>
                    <td>{{ log.message || '-' }}</td>
                  </tr>
                </tbody>
              </table>
              <ng-template #noAlertsTpl>
                <app-empty-state title="Aucune alerte recente" description="Les logs OCI recuperes ne contiennent pas de WARNING ou ERROR."></app-empty-state>
              </ng-template>
            </div>
          </ng-container>
        </app-panel-container>
      </div>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n    .header-actions {\n      display: flex;\n      align-items: center;\n      gap: 0.9rem;\n    }\n    .compartment-select {\n      min-width: 320px;\n    }\n    .header-hint {\n      margin: -0.5rem 0 1rem;\n      color: var(--text-secondary);\n      font-size: 0.85rem;\n    }\n    .overview-grid { align-items: start; }\n    .health-card,\n    .instance-list,\n    .log-list {\n      display: grid;\n      gap: 0.8rem;\n    }\n    .network-panel,\n    .network-summary {\n      display: grid;\n      gap: 0.8rem;\n    }\n    .network-summary {\n      grid-template-columns: repeat(2, minmax(0, 1fr));\n    }\n    .network-summary-card {\n      display: grid;\n      gap: 0.35rem;\n      padding: 0.9rem 0.95rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(255, 255, 255, 0.03);\n    }\n    .network-summary-label {\n      display: flex;\n      align-items: center;\n      gap: 0.5rem;\n      color: var(--text-secondary);\n      font-size: 0.84rem;\n    }\n    .network-dot {\n      width: 0.65rem;\n      height: 0.65rem;\n      border-radius: 999px;\n      display: inline-block;\n    }\n    .network-in {\n      border-color: rgba(76, 201, 240, 0.24);\n    }\n    .network-out {\n      border-color: rgba(255, 180, 84, 0.24);\n    }\n    .network-in-dot {\n      background: #4cc9f0;\n    }\n    .network-out-dot {\n      background: #ffb454;\n    }\n    .health-row,\n    .instance-head,\n    .log-head {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 0.75rem;\n    }\n    .instance-card,\n    .log-card {\n      display: grid;\n      gap: 0.45rem;\n      padding: 0.95rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(255, 255, 255, 0.03);\n    }\n    .instance-meta {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.75rem;\n      color: var(--text-secondary);\n      font-size: 0.82rem;\n    }\n    .alerts-table-wrapper {\n      overflow: auto;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n    }\n    table {\n      width: 100%;\n      border-collapse: collapse;\n    }\n    th,\n    td {\n      padding: 0.85rem 0.95rem;\n      text-align: left;\n      vertical-align: top;\n      border-bottom: 1px solid var(--border-soft);\n    }\n    th {\n      color: var(--text-secondary);\n      font-weight: 700;\n      background: rgba(255, 255, 255, 0.02);\n    }\n    .warn-chip {\n      border-color: rgba(255, 180, 84, 0.28);\n      background: rgba(255, 180, 84, 0.1);\n    }\n    .error-chip {\n      border-color: rgba(255, 107, 107, 0.28);\n      background: rgba(255, 107, 107, 0.1);\n    }\n    @media (max-width: 900px) {\n      .header-actions {\n        width: 100%;\n        flex-wrap: wrap;\n      }\n      .compartment-select {\n        width: 100%;\n        min-width: 0;\n      }\n      .network-summary {\n        grid-template-columns: 1fr;\n      }\n    }\n  "] }]
    }], () => [{ type: i1.OciService }, { type: i2.TimeRangeService }, { type: i0.ChangeDetectorRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OciOverviewPageComponent, { className: "OciOverviewPageComponent", filePath: "src\\app\\features\\oci\\oci-overview-page.component.ts", lineNumber: 388 }); })();
//# sourceMappingURL=oci-overview-page.component.js.map
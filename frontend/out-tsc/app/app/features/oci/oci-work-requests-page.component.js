import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PanelContainerComponent } from '../../shared/components/panel-container.component';
import { LoadingSkeletonComponent } from '../../shared/components/loading-skeleton.component';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';
import { ErrorStateComponent } from '../../shared/components/error-state.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "../../core/services/oci.service";
import * as i3 from "../../core/services/time-range.service";
import * as i4 from "@angular/material/paginator";
import * as i5 from "@angular/material/button";
import * as i6 from "@angular/material/form-field";
import * as i7 from "@angular/material/input";
import * as i8 from "@angular/material/select";
import * as i9 from "@angular/material/core";
const _c0 = () => [];
function OciWorkRequestsPageComponent_mat_option_18_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "mat-option", 34);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const compartment_r1 = ctx.$implicit;
    i0.ɵɵproperty("value", compartment_r1.id);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate2(" ", compartment_r1.name, " - ", compartment_r1.maskedId, " ");
} }
function OciWorkRequestsPageComponent_div_58_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 35);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.compartmentsMessage);
} }
function OciWorkRequestsPageComponent_div_59_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 8)(1, "div", 36)(2, "strong");
    i0.ɵɵtext(3, "Note OCI");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "span");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance();
    i0.ɵɵclassProp("notice-warn", ctx_r1.partialSupport);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(ctx_r1.pageNotice);
} }
function OciWorkRequestsPageComponent_ng_container_62_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelement(1, "app-loading-skeleton", 37);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    i0.ɵɵadvance();
    i0.ɵɵproperty("rows", 8);
} }
function OciWorkRequestsPageComponent_app_empty_state_63_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 38);
} }
function OciWorkRequestsPageComponent_app_empty_state_64_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-empty-state", 39);
} }
function OciWorkRequestsPageComponent_app_error_state_65_Template(rf, ctx) { if (rf & 1) {
    const _r3 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-error-state", 40);
    i0.ɵɵlistener("retry", function OciWorkRequestsPageComponent_app_error_state_65_Template_app_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r3); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.reload()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵproperty("message", ctx_r1.errorMessage)("details", ctx_r1.errorDetails);
} }
function OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_app_loading_skeleton_3_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "app-loading-skeleton", 37);
} if (rf & 2) {
    i0.ɵɵproperty("rows", 6);
} }
function OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_app_error_state_4_Template(rf, ctx) { if (rf & 1) {
    const _r7 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "app-error-state", 40);
    i0.ɵɵlistener("retry", function OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_app_error_state_4_Template_app_error_state_retry_0_listener() { i0.ɵɵrestoreView(_r7); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.reloadExpanded()); });
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵproperty("message", ctx_r1.detailErrorMessage)("details", ctx_r1.detailErrorDetails);
} }
function OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_div_16_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 56)(1, "div", 57);
    i0.ɵɵtext(2, "Compatibilite");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "div", 64);
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const details_r9 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(details_r9.supportMessage);
} }
function OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_div_20_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 67)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "span", 54);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const resource_r10 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(resource_r10.entityType || "resource");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(resource_r10.actionType || "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(resource_r10.maskedIdentifier || "-");
} }
function OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_div_20_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 65);
    i0.ɵɵtemplate(1, OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_div_20_article_1_Template, 7, 3, "article", 66);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const details_r9 = i0.ɵɵnextContext().ngIf;
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", details_r9.resources);
} }
function OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_ng_template_21_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵtext(1, "Aucune ressource detaillee n'a ete retournee.");
    i0.ɵɵelementEnd();
} }
function OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_div_32_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.expandedErrors == null ? null : ctx_r1.expandedErrors.message);
} }
function OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_div_33_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 70)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(3, "span");
    i0.ɵɵtext(4);
    i0.ɵɵpipe(5, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(6, "div");
    i0.ɵɵtext(7);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r11 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r11.code || "ERROR");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r11.timestamp ? i0.ɵɵpipeBind2(5, 3, item_r11.timestamp, "short") : "-");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r11.message || "-");
} }
function OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_div_33_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 68);
    i0.ɵɵtemplate(1, OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_div_33_article_1_Template, 8, 6, "article", 69);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", (ctx_r1.expandedErrors == null ? null : ctx_r1.expandedErrors.items) || i0.ɵɵpureFunction0(1, _c0));
} }
function OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_ng_template_34_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵtext(1, "Aucune erreur detaillee disponible.");
    i0.ɵɵelementEnd();
} }
function OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_div_45_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance();
    i0.ɵɵtextInterpolate(ctx_r1.expandedLogs == null ? null : ctx_r1.expandedLogs.message);
} }
function OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_div_46_article_1_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "article", 70)(1, "strong");
    i0.ɵɵtext(2);
    i0.ɵɵpipe(3, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "div");
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const item_r12 = ctx.$implicit;
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(item_r12.timestamp ? i0.ɵɵpipeBind2(3, 2, item_r12.timestamp, "short") : "-");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(item_r12.message || "-");
} }
function OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_div_46_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 68);
    i0.ɵɵtemplate(1, OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_div_46_article_1_Template, 6, 5, "article", 69);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(5);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngForOf", (ctx_r1.expandedLogs == null ? null : ctx_r1.expandedLogs.items) || i0.ɵɵpureFunction0(1, _c0));
} }
function OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_ng_template_47_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "div", 64);
    i0.ɵɵtext(1, "Aucun log detaille disponible.");
    i0.ɵɵelementEnd();
} }
function OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r8 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 52)(1, "div", 53)(2, "span");
    i0.ɵɵtext(3, "Work Request");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(4, "strong", 54);
    i0.ɵɵtext(5);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(6, "div", 53)(7, "span");
    i0.ɵɵtext(8, "Compartment");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "strong", 54);
    i0.ɵɵtext(10);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(11, "div", 53)(12, "span");
    i0.ɵɵtext(13, "API commune");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(14, "strong");
    i0.ɵɵtext(15);
    i0.ɵɵelementEnd()();
    i0.ɵɵtemplate(16, OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_div_16_Template, 5, 1, "div", 55);
    i0.ɵɵelementStart(17, "div", 56)(18, "div", 57);
    i0.ɵɵtext(19, "Ressources concernees");
    i0.ɵɵelementEnd();
    i0.ɵɵtemplate(20, OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_div_20_Template, 2, 1, "div", 58)(21, OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_ng_template_21_Template, 2, 0, "ng-template", null, 0, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "div", 56)(24, "div", 59)(25, "div", 57);
    i0.ɵɵtext(26, "Erreurs");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(27, "div", 60)(28, "button", 61);
    i0.ɵɵlistener("click", function OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_Template_button_click_28_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.loadExpandedErrors("prev")); });
    i0.ɵɵtext(29, "Precedent");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(30, "button", 61);
    i0.ɵɵlistener("click", function OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_Template_button_click_30_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.loadExpandedErrors("next")); });
    i0.ɵɵtext(31, "Suivant");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(32, OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_div_32_Template, 2, 1, "div", 62)(33, OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_div_33_Template, 2, 2, "div", 63)(34, OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_ng_template_34_Template, 2, 0, "ng-template", null, 1, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(36, "div", 56)(37, "div", 59)(38, "div", 57);
    i0.ɵɵtext(39, "Logs");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(40, "div", 60)(41, "button", 61);
    i0.ɵɵlistener("click", function OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_Template_button_click_41_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.loadExpandedLogs("prev")); });
    i0.ɵɵtext(42, "Precedent");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(43, "button", 61);
    i0.ɵɵlistener("click", function OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_Template_button_click_43_listener() { i0.ɵɵrestoreView(_r8); const ctx_r1 = i0.ɵɵnextContext(4); return i0.ɵɵresetView(ctx_r1.loadExpandedLogs("next")); });
    i0.ɵɵtext(44, "Suivant");
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(45, OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_div_45_Template, 2, 1, "div", 62)(46, OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_div_46_Template, 2, 2, "div", 63)(47, OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_ng_template_47_Template, 2, 0, "ng-template", null, 2, i0.ɵɵtemplateRefExtractor);
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const details_r9 = ctx.ngIf;
    const noResourcesTpl_r13 = i0.ɵɵreference(22);
    const noErrorsTpl_r14 = i0.ɵɵreference(35);
    const noLogsTpl_r15 = i0.ɵɵreference(48);
    const ctx_r1 = i0.ɵɵnextContext(4);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(details_r9.maskedId);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(details_r9.maskedCompartmentId);
    i0.ɵɵadvance(5);
    i0.ɵɵtextInterpolate(details_r9.commonApiSupported ? "Disponible" : "Partielle");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", details_r9.supportMessage);
    i0.ɵɵadvance(4);
    i0.ɵɵproperty("ngIf", details_r9.resources.length)("ngIfElse", noResourcesTpl_r13);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("disabled", !ctx_r1.canGoPreviousErrors);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r1.canGoNextErrors);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.expandedErrors == null ? null : ctx_r1.expandedErrors.message);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.expandedErrors == null ? null : ctx_r1.expandedErrors.items == null ? null : ctx_r1.expandedErrors.items.length)("ngIfElse", noErrorsTpl_r14);
    i0.ɵɵadvance(8);
    i0.ɵɵproperty("disabled", !ctx_r1.canGoPreviousLogs);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("disabled", !ctx_r1.canGoNextLogs);
    i0.ɵɵadvance(2);
    i0.ɵɵproperty("ngIf", ctx_r1.expandedLogs == null ? null : ctx_r1.expandedLogs.message);
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.expandedLogs == null ? null : ctx_r1.expandedLogs.items == null ? null : ctx_r1.expandedLogs.items.length)("ngIfElse", noLogsTpl_r15);
} }
function OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "tr")(1, "td", 48)(2, "div", 49);
    i0.ɵɵtemplate(3, OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_app_loading_skeleton_3_Template, 1, 1, "app-loading-skeleton", 50)(4, OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_app_error_state_4_Template, 1, 2, "app-error-state", 32)(5, OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_div_5_Template, 49, 16, "div", 51);
    i0.ɵɵelementEnd()()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext(3);
    i0.ɵɵadvance(3);
    i0.ɵɵproperty("ngIf", ctx_r1.detailState === "loading");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.detailState === "error");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.detailState === "ready" && ctx_r1.expandedDetails);
} }
function OciWorkRequestsPageComponent_div_66_ng_container_22_Template(rf, ctx) { if (rf & 1) {
    const _r5 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementContainerStart(0);
    i0.ɵɵelementStart(1, "tr")(2, "td")(3, "strong");
    i0.ɵɵtext(4);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(5, "div", 45);
    i0.ɵɵtext(6);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(7, "td");
    i0.ɵɵtext(8);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "td")(10, "span", 46);
    i0.ɵɵtext(11);
    i0.ɵɵelementEnd()();
    i0.ɵɵelementStart(12, "td");
    i0.ɵɵtext(13);
    i0.ɵɵpipe(14, "number");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "td");
    i0.ɵɵtext(16);
    i0.ɵɵpipe(17, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(18, "td");
    i0.ɵɵtext(19);
    i0.ɵɵpipe(20, "date");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(21, "td", 47);
    i0.ɵɵtext(22);
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(23, "td")(24, "button", 6);
    i0.ɵɵlistener("click", function OciWorkRequestsPageComponent_div_66_ng_container_22_Template_button_click_24_listener() { const workRequest_r6 = i0.ɵɵrestoreView(_r5).$implicit; const ctx_r1 = i0.ɵɵnextContext(2); return i0.ɵɵresetView(ctx_r1.toggleDetails(workRequest_r6)); });
    i0.ɵɵtext(25);
    i0.ɵɵelementEnd()()();
    i0.ɵɵtemplate(26, OciWorkRequestsPageComponent_div_66_ng_container_22_tr_26_Template, 6, 3, "tr", 29);
    i0.ɵɵelementContainerEnd();
} if (rf & 2) {
    const workRequest_r6 = ctx.$implicit;
    const ctx_r1 = i0.ɵɵnextContext(2);
    i0.ɵɵadvance(4);
    i0.ɵɵtextInterpolate(workRequest_r6.operationType || "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(workRequest_r6.maskedId);
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(workRequest_r6.resourceSummary || "-");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(workRequest_r6.status || "-");
    i0.ɵɵadvance(2);
    i0.ɵɵtextInterpolate(workRequest_r6.percentComplete == null ? "-" : i0.ɵɵpipeBind2(14, 10, workRequest_r6.percentComplete, "1.0-0") + " %");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(i0.ɵɵpipeBind2(17, 13, workRequest_r6.timeStarted || workRequest_r6.timeAccepted, "short"));
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(workRequest_r6.timeFinished ? i0.ɵɵpipeBind2(20, 16, workRequest_r6.timeFinished, "short") : "-");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate(workRequest_r6.errorMessage || workRequest_r6.supportMessage || "-");
    i0.ɵɵadvance(3);
    i0.ɵɵtextInterpolate1(" ", ctx_r1.expandedWorkRequestId === workRequest_r6.id ? "Masquer" : "Afficher", " ");
    i0.ɵɵadvance();
    i0.ɵɵproperty("ngIf", ctx_r1.expandedWorkRequestId === workRequest_r6.id);
} }
function OciWorkRequestsPageComponent_div_66_Template(rf, ctx) { if (rf & 1) {
    const _r4 = i0.ɵɵgetCurrentView();
    i0.ɵɵelementStart(0, "div", 41)(1, "div", 42)(2, "table")(3, "thead")(4, "tr")(5, "th");
    i0.ɵɵtext(6, "Operation");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(7, "th");
    i0.ɵɵtext(8, "Ressource");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(9, "th");
    i0.ɵɵtext(10, "Statut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(11, "th");
    i0.ɵɵtext(12, "Termine");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(13, "th");
    i0.ɵɵtext(14, "Debut");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(15, "th");
    i0.ɵɵtext(16, "Fin");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(17, "th");
    i0.ɵɵtext(18, "Erreur");
    i0.ɵɵelementEnd();
    i0.ɵɵelementStart(19, "th");
    i0.ɵɵtext(20, "Details");
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(21, "tbody");
    i0.ɵɵtemplate(22, OciWorkRequestsPageComponent_div_66_ng_container_22_Template, 27, 19, "ng-container", 43);
    i0.ɵɵelementEnd()()();
    i0.ɵɵelementStart(23, "mat-paginator", 44);
    i0.ɵɵlistener("page", function OciWorkRequestsPageComponent_div_66_Template_mat_paginator_page_23_listener($event) { i0.ɵɵrestoreView(_r4); const ctx_r1 = i0.ɵɵnextContext(); return i0.ɵɵresetView(ctx_r1.onPageChange($event)); });
    i0.ɵɵelementEnd()();
} if (rf & 2) {
    const ctx_r1 = i0.ɵɵnextContext();
    i0.ɵɵadvance(22);
    i0.ɵɵproperty("ngForOf", (ctx_r1.pageData == null ? null : ctx_r1.pageData.items) || i0.ɵɵpureFunction0(5, _c0));
    i0.ɵɵadvance();
    i0.ɵɵproperty("pageIndex", ctx_r1.pageIndex)("pageSize", ctx_r1.pageSize)("pageSizeOptions", ctx_r1.pageSizeOptions)("length", ctx_r1.paginatorLength);
} }
export class OciWorkRequestsPageComponent {
    constructor(formBuilder, ociService, timeRangeService, cdr) {
        this.formBuilder = formBuilder;
        this.ociService = ociService;
        this.timeRangeService = timeRangeService;
        this.cdr = cdr;
        this.pageSizeOptions = [10, 20, 50];
        this.detailPageLimit = 10;
        this.state = 'loading';
        this.detailState = 'idle';
        this.pageData = null;
        this.pageIndex = 0;
        this.pageSize = 20;
        this.pageNotice = '';
        this.partialSupport = false;
        this.errorMessage = '';
        this.errorDetails = '';
        this.detailErrorMessage = '';
        this.detailErrorDetails = '';
        this.compartments = [];
        this.compartmentsMessage = '';
        this.expandedWorkRequestId = null;
        this.expandedDetails = null;
        this.expandedErrors = null;
        this.expandedLogs = null;
        this.errorPageTokens = [null];
        this.errorPageIndex = 0;
        this.logPageTokens = [null];
        this.logPageIndex = 0;
        this.filtersForm = this.formBuilder.nonNullable.group({
            compartmentId: [''],
            status: [''],
            operationType: [''],
            resource: [''],
            from: [this.toLocalDateTime(this.defaultStart())],
            to: [this.toLocalDateTime(new Date())]
        });
    }
    ngOnInit() {
        this.loadCompartments();
        this.loadWorkRequests();
    }
    reload() {
        this.loadCompartments();
        this.loadWorkRequests();
    }
    applyFilters() {
        this.pageIndex = 0;
        this.loadWorkRequests();
    }
    resetFilters() {
        this.filtersForm.reset({
            compartmentId: '',
            status: '',
            operationType: '',
            resource: '',
            from: this.toLocalDateTime(this.defaultStart()),
            to: this.toLocalDateTime(new Date())
        });
        this.pageIndex = 0;
        this.loadWorkRequests();
    }
    onPageChange(event) {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.loadWorkRequests();
    }
    get paginatorLength() {
        if (!this.pageData) {
            return this.pageSize;
        }
        return this.pageData.hasNext
            ? (this.pageIndex + 2) * this.pageSize
            : this.pageIndex * this.pageSize + this.pageData.items.length;
    }
    toggleDetails(workRequest) {
        if (this.expandedWorkRequestId === workRequest.id) {
            this.expandedWorkRequestId = null;
            this.expandedDetails = null;
            this.expandedErrors = null;
            this.expandedLogs = null;
            this.detailState = 'idle';
            this.cdr.markForCheck();
            return;
        }
        this.expandedWorkRequestId = workRequest.id;
        this.expandedDetails = workRequest;
        this.detailState = 'loading';
        this.detailErrorMessage = '';
        this.detailErrorDetails = '';
        this.errorPageTokens = [null];
        this.errorPageIndex = 0;
        this.logPageTokens = [null];
        this.logPageIndex = 0;
        this.expandedErrors = null;
        this.expandedLogs = null;
        this.cdr.markForCheck();
        this.ociService.workRequest(workRequest.id).subscribe({
            next: (details) => {
                if (this.expandedWorkRequestId !== workRequest.id) {
                    return;
                }
                this.expandedDetails = details;
                this.detailState = 'ready';
                this.cdr.markForCheck();
                this.loadExpandedErrors();
                this.loadExpandedLogs();
            },
            error: (error) => {
                if (this.expandedWorkRequestId !== workRequest.id) {
                    return;
                }
                this.detailState = 'error';
                this.detailErrorMessage = this.extractErrorMessage(error, 'Impossible de charger le detail du work request.');
                this.detailErrorDetails = this.extractErrorDetails(error);
                this.cdr.markForCheck();
            }
        });
    }
    reloadExpanded() {
        const current = this.expandedDetails;
        if (!current) {
            return;
        }
        this.toggleDetails(current);
        this.toggleDetails(current);
    }
    loadExpandedErrors(direction = 'current') {
        if (!this.expandedWorkRequestId) {
            return;
        }
        if (direction === 'next' && this.expandedErrors?.nextPage) {
            if (this.errorPageTokens.length === this.errorPageIndex + 1) {
                this.errorPageTokens.push(this.expandedErrors.nextPage);
            }
            this.errorPageIndex++;
        }
        else if (direction === 'prev' && this.errorPageIndex > 0) {
            this.errorPageIndex--;
        }
        const token = this.errorPageTokens[this.errorPageIndex] || null;
        this.ociService.workRequestErrors(this.expandedWorkRequestId, token, this.detailPageLimit).subscribe({
            next: (response) => {
                this.expandedErrors = response;
                this.cdr.markForCheck();
            },
            error: () => {
                this.expandedErrors = {
                    items: [],
                    limit: this.detailPageLimit,
                    nextPage: null,
                    hasNext: false,
                    partialSupport: true,
                    message: "Les erreurs detaillees ne sont pas disponibles pour ce work request."
                };
                this.cdr.markForCheck();
            }
        });
    }
    loadExpandedLogs(direction = 'current') {
        if (!this.expandedWorkRequestId) {
            return;
        }
        if (direction === 'next' && this.expandedLogs?.nextPage) {
            if (this.logPageTokens.length === this.logPageIndex + 1) {
                this.logPageTokens.push(this.expandedLogs.nextPage);
            }
            this.logPageIndex++;
        }
        else if (direction === 'prev' && this.logPageIndex > 0) {
            this.logPageIndex--;
        }
        const token = this.logPageTokens[this.logPageIndex] || null;
        this.ociService.workRequestLogs(this.expandedWorkRequestId, token, this.detailPageLimit).subscribe({
            next: (response) => {
                this.expandedLogs = response;
                this.cdr.markForCheck();
            },
            error: () => {
                this.expandedLogs = {
                    items: [],
                    limit: this.detailPageLimit,
                    nextPage: null,
                    hasNext: false,
                    partialSupport: true,
                    message: "Les logs detaillees ne sont pas disponibles pour ce work request."
                };
                this.cdr.markForCheck();
            }
        });
    }
    get canGoPreviousErrors() {
        return this.errorPageIndex > 0;
    }
    get canGoNextErrors() {
        return !!this.expandedErrors?.hasNext;
    }
    get canGoPreviousLogs() {
        return this.logPageIndex > 0;
    }
    get canGoNextLogs() {
        return !!this.expandedLogs?.hasNext;
    }
    loadCompartments() {
        this.compartmentsMessage = '';
        this.ociService.compartments().subscribe({
            next: (response) => {
                this.compartments = response.compartments || [];
                if (!this.filtersForm.controls.compartmentId.getRawValue() && response.configuredCompartmentId) {
                    this.filtersForm.controls.compartmentId.setValue(response.configuredCompartmentId);
                }
                this.cdr.markForCheck();
            },
            error: (error) => {
                this.compartments = [];
                this.compartmentsMessage = this.extractErrorCode(error) === 'OCI_NOT_CONFIGURED'
                    ? "La liste des compartments OCI n'est pas disponible tant que la source n'est pas configuree."
                    : this.extractErrorMessage(error, 'Impossible de charger les compartments OCI.');
                this.cdr.markForCheck();
            }
        });
    }
    loadWorkRequests() {
        this.state = 'loading';
        this.pageData = null;
        this.pageNotice = '';
        this.partialSupport = false;
        this.errorMessage = '';
        this.errorDetails = '';
        this.expandedWorkRequestId = null;
        this.expandedDetails = null;
        this.expandedErrors = null;
        this.expandedLogs = null;
        this.detailState = 'idle';
        this.cdr.markForCheck();
        this.ociService.workRequests({
            compartmentId: this.toNull(this.filtersForm.controls.compartmentId.getRawValue()),
            status: this.toNull(this.filtersForm.controls.status.getRawValue()),
            operationType: this.toNull(this.filtersForm.controls.operationType.getRawValue()),
            resource: this.toNull(this.filtersForm.controls.resource.getRawValue()),
            from: this.toIso(this.filtersForm.controls.from.getRawValue()),
            to: this.toIso(this.filtersForm.controls.to.getRawValue()),
            page: this.pageIndex,
            limit: this.pageSize
        }).subscribe({
            next: (response) => {
                this.pageData = response;
                this.pageNotice = response.message || '';
                this.partialSupport = response.partialSupport;
                this.state = response.items.length ? 'ready' : 'empty';
                this.cdr.markForCheck();
            },
            error: (error) => {
                this.pageData = null;
                if (this.extractErrorCode(error) === 'OCI_NOT_CONFIGURED') {
                    this.state = 'not-configured';
                }
                else {
                    this.state = 'error';
                    this.errorMessage = this.extractErrorMessage(error, 'Impossible de charger les work requests OCI.');
                    this.errorDetails = this.extractErrorDetails(error);
                }
                this.cdr.markForCheck();
            }
        });
    }
    defaultStart() {
        return new Date(Date.now() - this.timeRangeService.selected().seconds * 1000);
    }
    toLocalDateTime(value) {
        const year = value.getFullYear();
        const month = `${value.getMonth() + 1}`.padStart(2, '0');
        const day = `${value.getDate()}`.padStart(2, '0');
        const hours = `${value.getHours()}`.padStart(2, '0');
        const minutes = `${value.getMinutes()}`.padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
    toIso(value) {
        const trimmed = value.trim();
        return trimmed ? new Date(trimmed).toISOString() : null;
    }
    toNull(value) {
        const trimmed = value.trim();
        return trimmed ? trimmed : null;
    }
    extractErrorCode(error) {
        if (typeof error === 'object' && error !== null && 'error' in error) {
            return (error.error?.code) || '';
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
        if (typeof error === 'object' && error !== null && 'error' in error) {
            const payload = error.error;
            if (Array.isArray(payload?.details) && payload.details.length) {
                return payload.details.join('\n');
            }
        }
        return '';
    }
    static { this.ɵfac = function OciWorkRequestsPageComponent_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || OciWorkRequestsPageComponent)(i0.ɵɵdirectiveInject(i1.FormBuilder), i0.ɵɵdirectiveInject(i2.OciService), i0.ɵɵdirectiveInject(i3.TimeRangeService), i0.ɵɵdirectiveInject(i0.ChangeDetectorRef)); }; }
    static { this.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: OciWorkRequestsPageComponent, selectors: [["app-oci-work-requests-page"]], standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 67, vars: 9, consts: [["noResourcesTpl", ""], ["noErrorsTpl", ""], ["noLogsTpl", ""], [1, "page-header"], [1, "page-title"], [1, "page-subtitle"], ["mat-stroked-button", "", "type", "button", 3, "click"], [1, "section-grid"], [1, "span-12"], ["title", "Filtres", "subtitle", "Compartment, statut, operation, periode et ressource avec pagination cote serveur."], [1, "filters-grid", 3, "ngSubmit", "formGroup"], ["formControlName", "compartmentId"], ["value", ""], [3, "value", 4, "ngFor", "ngForOf"], ["formControlName", "status"], ["value", "ACCEPTED"], ["value", "IN_PROGRESS"], ["value", "FAILED"], ["value", "SUCCEEDED"], ["value", "CANCELING"], ["value", "CANCELED"], ["matInput", "", "formControlName", "operationType", "placeholder", "CREATE, UPDATE, DELETE..."], ["matInput", "", "formControlName", "resource", "placeholder", "OCID, type ou identifiant masque"], ["matInput", "", "type", "datetime-local", "formControlName", "from"], ["matInput", "", "type", "datetime-local", "formControlName", "to"], [1, "filters-actions"], ["class", "hint-row", 4, "ngIf"], ["class", "span-12", 4, "ngIf"], ["title", "Work Requests", "subtitle", "Operation, ressource, statut, progression et detail sans ecriture OCI."], [4, "ngIf"], ["title", "OCI non configure", "description", "La source OCI n'est pas encore configuree.", 4, "ngIf"], ["title", "Aucun work request", "description", "Aucun work request ne correspond aux filtres actifs.", 4, "ngIf"], [3, "message", "details", "retry", 4, "ngIf"], ["class", "table-block", 4, "ngIf"], [3, "value"], [1, "hint-row"], [1, "notice-card"], [3, "rows"], ["title", "OCI non configure", "description", "La source OCI n'est pas encore configuree."], ["title", "Aucun work request", "description", "Aucun work request ne correspond aux filtres actifs."], [3, "retry", "message", "details"], [1, "table-block"], [1, "table-wrapper"], [4, "ngFor", "ngForOf"], [3, "page", "pageIndex", "pageSize", "pageSizeOptions", "length"], [1, "muted", "monospace"], [1, "chip"], [1, "message-cell"], ["colspan", "8", 1, "expanded-cell"], [1, "expanded-panel"], [3, "rows", 4, "ngIf"], ["class", "expanded-grid", 4, "ngIf"], [1, "expanded-grid"], [1, "detail-card"], [1, "monospace"], ["class", "detail-section", 4, "ngIf"], [1, "detail-section"], [1, "section-title"], ["class", "resource-list", 4, "ngIf", "ngIfElse"], [1, "section-head"], [1, "pager-actions"], ["mat-stroked-button", "", "type", "button", 3, "click", "disabled"], ["class", "muted", 4, "ngIf"], ["class", "detail-list", 4, "ngIf", "ngIfElse"], [1, "muted"], [1, "resource-list"], ["class", "resource-card", 4, "ngFor", "ngForOf"], [1, "resource-card"], [1, "detail-list"], ["class", "timeline-card", 4, "ngFor", "ngForOf"], [1, "timeline-card"]], template: function OciWorkRequestsPageComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 3)(1, "div")(2, "h1", 4);
            i0.ɵɵtext(3, "OCI Work Requests");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(4, "div", 5);
            i0.ɵɵtext(5, "Lecture seule des work requests OCI communs, avec pagination backend et details repliables.");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(6, "button", 6);
            i0.ɵɵlistener("click", function OciWorkRequestsPageComponent_Template_button_click_6_listener() { return ctx.reload(); });
            i0.ɵɵtext(7, "Actualiser");
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(8, "div", 7)(9, "div", 8)(10, "app-panel-container", 9)(11, "form", 10);
            i0.ɵɵlistener("ngSubmit", function OciWorkRequestsPageComponent_Template_form_ngSubmit_11_listener() { return ctx.applyFilters(); });
            i0.ɵɵelementStart(12, "mat-form-field")(13, "mat-label");
            i0.ɵɵtext(14, "Compartment");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(15, "mat-select", 11)(16, "mat-option", 12);
            i0.ɵɵtext(17, "Compartment configure");
            i0.ɵɵelementEnd();
            i0.ɵɵtemplate(18, OciWorkRequestsPageComponent_mat_option_18_Template, 2, 3, "mat-option", 13);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(19, "mat-form-field")(20, "mat-label");
            i0.ɵɵtext(21, "Statut");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(22, "mat-select", 14)(23, "mat-option", 12);
            i0.ɵɵtext(24, "Tous");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(25, "mat-option", 15);
            i0.ɵɵtext(26, "ACCEPTED");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(27, "mat-option", 16);
            i0.ɵɵtext(28, "IN_PROGRESS");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "mat-option", 17);
            i0.ɵɵtext(30, "FAILED");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "mat-option", 18);
            i0.ɵɵtext(32, "SUCCEEDED");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(33, "mat-option", 19);
            i0.ɵɵtext(34, "CANCELING");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(35, "mat-option", 20);
            i0.ɵɵtext(36, "CANCELED");
            i0.ɵɵelementEnd()()();
            i0.ɵɵelementStart(37, "mat-form-field")(38, "mat-label");
            i0.ɵɵtext(39, "Type d'operation");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(40, "input", 21);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(41, "mat-form-field")(42, "mat-label");
            i0.ɵɵtext(43, "Ressource");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(44, "input", 22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(45, "mat-form-field")(46, "mat-label");
            i0.ɵɵtext(47, "Debut");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(48, "input", 23);
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(49, "mat-form-field")(50, "mat-label");
            i0.ɵɵtext(51, "Fin");
            i0.ɵɵelementEnd();
            i0.ɵɵelement(52, "input", 24);
            i0.ɵɵelementEnd()();
            i0.ɵɵelementStart(53, "div", 25)(54, "button", 6);
            i0.ɵɵlistener("click", function OciWorkRequestsPageComponent_Template_button_click_54_listener() { return ctx.applyFilters(); });
            i0.ɵɵtext(55, "Appliquer");
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(56, "button", 6);
            i0.ɵɵlistener("click", function OciWorkRequestsPageComponent_Template_button_click_56_listener() { return ctx.resetFilters(); });
            i0.ɵɵtext(57, "Reinitialiser");
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(58, OciWorkRequestsPageComponent_div_58_Template, 2, 1, "div", 26);
            i0.ɵɵelementEnd()();
            i0.ɵɵtemplate(59, OciWorkRequestsPageComponent_div_59_Template, 6, 3, "div", 27);
            i0.ɵɵelementStart(60, "div", 8)(61, "app-panel-container", 28);
            i0.ɵɵtemplate(62, OciWorkRequestsPageComponent_ng_container_62_Template, 2, 1, "ng-container", 29)(63, OciWorkRequestsPageComponent_app_empty_state_63_Template, 1, 0, "app-empty-state", 30)(64, OciWorkRequestsPageComponent_app_empty_state_64_Template, 1, 0, "app-empty-state", 31)(65, OciWorkRequestsPageComponent_app_error_state_65_Template, 1, 2, "app-error-state", 32)(66, OciWorkRequestsPageComponent_div_66_Template, 24, 6, "div", 33);
            i0.ɵɵelementEnd()()();
        } if (rf & 2) {
            i0.ɵɵadvance(11);
            i0.ɵɵproperty("formGroup", ctx.filtersForm);
            i0.ɵɵadvance(7);
            i0.ɵɵproperty("ngForOf", ctx.compartments);
            i0.ɵɵadvance(40);
            i0.ɵɵproperty("ngIf", ctx.compartmentsMessage);
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.pageNotice);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("ngIf", ctx.state === "loading");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.state === "not-configured");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.state === "empty");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.state === "error");
            i0.ɵɵadvance();
            i0.ɵɵproperty("ngIf", ctx.state === "ready");
        } }, dependencies: [NgIf,
            NgFor,
            DatePipe,
            DecimalPipe,
            ReactiveFormsModule, i1.ɵNgNoValidate, i1.DefaultValueAccessor, i1.NgControlStatus, i1.NgControlStatusGroup, i1.FormGroupDirective, i1.FormControlName, MatPaginatorModule, i4.MatPaginator, MatButtonModule, i5.MatButton, MatFormFieldModule, i6.MatFormField, i6.MatLabel, MatInputModule, i7.MatInput, MatSelectModule, i8.MatSelect, i9.MatOption, PanelContainerComponent,
            LoadingSkeletonComponent,
            EmptyStateComponent,
            ErrorStateComponent], styles: [".filters-grid[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(3, minmax(0, 1fr));\n      gap: 0.85rem;\n    }\n    .filters-actions[_ngcontent-%COMP%], \n   .pager-actions[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.75rem;\n    }\n    .hint-row[_ngcontent-%COMP%], \n   .notice-card[_ngcontent-%COMP%] {\n      color: var(--text-secondary);\n    }\n    .notice-card[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.3rem;\n      padding: 0.95rem 1rem;\n      border: 1px solid rgba(76, 201, 240, 0.2);\n      border-radius: var(--radius-md);\n      background: rgba(76, 201, 240, 0.06);\n    }\n    .notice-warn[_ngcontent-%COMP%] {\n      border-color: rgba(255, 180, 84, 0.24);\n      background: rgba(255, 180, 84, 0.08);\n    }\n    .table-block[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.85rem;\n    }\n    .table-wrapper[_ngcontent-%COMP%] {\n      overflow: auto;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n    }\n    table[_ngcontent-%COMP%] {\n      width: 100%;\n      border-collapse: collapse;\n    }\n    th[_ngcontent-%COMP%], \n   td[_ngcontent-%COMP%] {\n      padding: 0.9rem 1rem;\n      text-align: left;\n      vertical-align: top;\n      border-bottom: 1px solid var(--border-soft);\n    }\n    th[_ngcontent-%COMP%] {\n      color: var(--text-secondary);\n      font-weight: 700;\n      background: rgba(255, 255, 255, 0.02);\n    }\n    .message-cell[_ngcontent-%COMP%], \n   .expanded-cell[_ngcontent-%COMP%] {\n      white-space: normal;\n      overflow-wrap: anywhere;\n      word-break: break-word;\n    }\n    .expanded-cell[_ngcontent-%COMP%] {\n      padding: 0;\n      background: rgba(8, 14, 25, 0.38);\n    }\n    .expanded-panel[_ngcontent-%COMP%] {\n      padding: 1rem;\n    }\n    .expanded-grid[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.9rem;\n    }\n    .detail-card[_ngcontent-%COMP%], \n   .resource-card[_ngcontent-%COMP%], \n   .timeline-card[_ngcontent-%COMP%], \n   .detail-section[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.35rem;\n      padding: 0.9rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(255, 255, 255, 0.03);\n    }\n    .detail-card[_ngcontent-%COMP%] {\n      grid-template-columns: 1fr;\n    }\n    .detail-card[_ngcontent-%COMP%]   span[_ngcontent-%COMP%], \n   .section-title[_ngcontent-%COMP%] {\n      color: var(--text-secondary);\n      font-size: 0.78rem;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n    }\n    .resource-list[_ngcontent-%COMP%], \n   .detail-list[_ngcontent-%COMP%] {\n      display: grid;\n      gap: 0.75rem;\n    }\n    .section-head[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 1rem;\n      flex-wrap: wrap;\n      margin-bottom: 0.6rem;\n    }\n    .monospace[_ngcontent-%COMP%] {\n      word-break: break-all;\n    }\n    @media (max-width: 1080px) {\n      .filters-grid[_ngcontent-%COMP%] {\n        grid-template-columns: 1fr;\n      }\n    }"], changeDetection: 0 }); }
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(OciWorkRequestsPageComponent, [{
        type: Component,
        args: [{ selector: 'app-oci-work-requests-page', standalone: true, imports: [
                    NgIf,
                    NgFor,
                    DatePipe,
                    DecimalPipe,
                    ReactiveFormsModule,
                    MatPaginatorModule,
                    MatButtonModule,
                    MatFormFieldModule,
                    MatInputModule,
                    MatSelectModule,
                    PanelContainerComponent,
                    LoadingSkeletonComponent,
                    EmptyStateComponent,
                    ErrorStateComponent
                ], template: `
    <div class="page-header">
      <div>
        <h1 class="page-title">OCI Work Requests</h1>
        <div class="page-subtitle">Lecture seule des work requests OCI communs, avec pagination backend et details repliables.</div>
      </div>
      <button mat-stroked-button type="button" (click)="reload()">Actualiser</button>
    </div>

    <div class="section-grid">
      <div class="span-12">
        <app-panel-container title="Filtres" subtitle="Compartment, statut, operation, periode et ressource avec pagination cote serveur.">
          <form [formGroup]="filtersForm" class="filters-grid" (ngSubmit)="applyFilters()">
            <mat-form-field>
              <mat-label>Compartment</mat-label>
              <mat-select formControlName="compartmentId">
                <mat-option value="">Compartment configure</mat-option>
                <mat-option *ngFor="let compartment of compartments" [value]="compartment.id">
                  {{ compartment.name }} - {{ compartment.maskedId }}
                </mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Statut</mat-label>
              <mat-select formControlName="status">
                <mat-option value="">Tous</mat-option>
                <mat-option value="ACCEPTED">ACCEPTED</mat-option>
                <mat-option value="IN_PROGRESS">IN_PROGRESS</mat-option>
                <mat-option value="FAILED">FAILED</mat-option>
                <mat-option value="SUCCEEDED">SUCCEEDED</mat-option>
                <mat-option value="CANCELING">CANCELING</mat-option>
                <mat-option value="CANCELED">CANCELED</mat-option>
              </mat-select>
            </mat-form-field>

            <mat-form-field>
              <mat-label>Type d'operation</mat-label>
              <input matInput formControlName="operationType" placeholder="CREATE, UPDATE, DELETE...">
            </mat-form-field>

            <mat-form-field>
              <mat-label>Ressource</mat-label>
              <input matInput formControlName="resource" placeholder="OCID, type ou identifiant masque">
            </mat-form-field>

            <mat-form-field>
              <mat-label>Debut</mat-label>
              <input matInput type="datetime-local" formControlName="from">
            </mat-form-field>

            <mat-form-field>
              <mat-label>Fin</mat-label>
              <input matInput type="datetime-local" formControlName="to">
            </mat-form-field>
          </form>

          <div class="filters-actions">
            <button mat-stroked-button type="button" (click)="applyFilters()">Appliquer</button>
            <button mat-stroked-button type="button" (click)="resetFilters()">Reinitialiser</button>
          </div>

          <div class="hint-row" *ngIf="compartmentsMessage">{{ compartmentsMessage }}</div>
        </app-panel-container>
      </div>

      <div class="span-12" *ngIf="pageNotice">
        <div class="notice-card" [class.notice-warn]="partialSupport">
          <strong>Note OCI</strong>
          <span>{{ pageNotice }}</span>
        </div>
      </div>

      <div class="span-12">
        <app-panel-container title="Work Requests" subtitle="Operation, ressource, statut, progression et detail sans ecriture OCI.">
          <ng-container *ngIf="state === 'loading'">
            <app-loading-skeleton [rows]="8"></app-loading-skeleton>
          </ng-container>

          <app-empty-state *ngIf="state === 'not-configured'" title="OCI non configure" description="La source OCI n'est pas encore configuree."></app-empty-state>
          <app-empty-state *ngIf="state === 'empty'" title="Aucun work request" description="Aucun work request ne correspond aux filtres actifs."></app-empty-state>
          <app-error-state *ngIf="state === 'error'" [message]="errorMessage" [details]="errorDetails" (retry)="reload()"></app-error-state>

          <div *ngIf="state === 'ready'" class="table-block">
            <div class="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Operation</th>
                    <th>Ressource</th>
                    <th>Statut</th>
                    <th>Termine</th>
                    <th>Debut</th>
                    <th>Fin</th>
                    <th>Erreur</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  <ng-container *ngFor="let workRequest of pageData?.items || []">
                    <tr>
                      <td>
                        <strong>{{ workRequest.operationType || '-' }}</strong>
                        <div class="muted monospace">{{ workRequest.maskedId }}</div>
                      </td>
                      <td>{{ workRequest.resourceSummary || '-' }}</td>
                      <td><span class="chip">{{ workRequest.status || '-' }}</span></td>
                      <td>{{ workRequest.percentComplete == null ? '-' : (workRequest.percentComplete | number:'1.0-0') + ' %' }}</td>
                      <td>{{ (workRequest.timeStarted || workRequest.timeAccepted) | date:'short' }}</td>
                      <td>{{ workRequest.timeFinished ? (workRequest.timeFinished | date:'short') : '-' }}</td>
                      <td class="message-cell">{{ workRequest.errorMessage || workRequest.supportMessage || '-' }}</td>
                      <td>
                        <button mat-stroked-button type="button" (click)="toggleDetails(workRequest)">
                          {{ expandedWorkRequestId === workRequest.id ? 'Masquer' : 'Afficher' }}
                        </button>
                      </td>
                    </tr>

                    <tr *ngIf="expandedWorkRequestId === workRequest.id">
                      <td colspan="8" class="expanded-cell">
                        <div class="expanded-panel">
                          <app-loading-skeleton *ngIf="detailState === 'loading'" [rows]="6"></app-loading-skeleton>

                          <app-error-state *ngIf="detailState === 'error'" [message]="detailErrorMessage" [details]="detailErrorDetails" (retry)="reloadExpanded()"></app-error-state>

                          <div *ngIf="detailState === 'ready' && expandedDetails as details" class="expanded-grid">
                            <div class="detail-card">
                              <span>Work Request</span>
                              <strong class="monospace">{{ details.maskedId }}</strong>
                            </div>
                            <div class="detail-card">
                              <span>Compartment</span>
                              <strong class="monospace">{{ details.maskedCompartmentId }}</strong>
                            </div>
                            <div class="detail-card">
                              <span>API commune</span>
                              <strong>{{ details.commonApiSupported ? 'Disponible' : 'Partielle' }}</strong>
                            </div>

                            <div class="detail-section" *ngIf="details.supportMessage">
                              <div class="section-title">Compatibilite</div>
                              <div class="muted">{{ details.supportMessage }}</div>
                            </div>

                            <div class="detail-section">
                              <div class="section-title">Ressources concernees</div>
                              <div *ngIf="details.resources.length; else noResourcesTpl" class="resource-list">
                                <article *ngFor="let resource of details.resources" class="resource-card">
                                  <strong>{{ resource.entityType || 'resource' }}</strong>
                                  <span>{{ resource.actionType || '-' }}</span>
                                  <span class="monospace">{{ resource.maskedIdentifier || '-' }}</span>
                                </article>
                              </div>
                              <ng-template #noResourcesTpl>
                                <div class="muted">Aucune ressource detaillee n'a ete retournee.</div>
                              </ng-template>
                            </div>

                            <div class="detail-section">
                              <div class="section-head">
                                <div class="section-title">Erreurs</div>
                                <div class="pager-actions">
                                  <button mat-stroked-button type="button" (click)="loadExpandedErrors('prev')" [disabled]="!canGoPreviousErrors">Precedent</button>
                                  <button mat-stroked-button type="button" (click)="loadExpandedErrors('next')" [disabled]="!canGoNextErrors">Suivant</button>
                                </div>
                              </div>
                              <div class="muted" *ngIf="expandedErrors?.message">{{ expandedErrors?.message }}</div>
                              <div *ngIf="expandedErrors?.items?.length; else noErrorsTpl" class="detail-list">
                                <article *ngFor="let item of expandedErrors?.items || []" class="timeline-card">
                                  <strong>{{ item.code || 'ERROR' }}</strong>
                                  <span>{{ item.timestamp ? (item.timestamp | date:'short') : '-' }}</span>
                                  <div>{{ item.message || '-' }}</div>
                                </article>
                              </div>
                              <ng-template #noErrorsTpl>
                                <div class="muted">Aucune erreur detaillee disponible.</div>
                              </ng-template>
                            </div>

                            <div class="detail-section">
                              <div class="section-head">
                                <div class="section-title">Logs</div>
                                <div class="pager-actions">
                                  <button mat-stroked-button type="button" (click)="loadExpandedLogs('prev')" [disabled]="!canGoPreviousLogs">Precedent</button>
                                  <button mat-stroked-button type="button" (click)="loadExpandedLogs('next')" [disabled]="!canGoNextLogs">Suivant</button>
                                </div>
                              </div>
                              <div class="muted" *ngIf="expandedLogs?.message">{{ expandedLogs?.message }}</div>
                              <div *ngIf="expandedLogs?.items?.length; else noLogsTpl" class="detail-list">
                                <article *ngFor="let item of expandedLogs?.items || []" class="timeline-card">
                                  <strong>{{ item.timestamp ? (item.timestamp | date:'short') : '-' }}</strong>
                                  <div>{{ item.message || '-' }}</div>
                                </article>
                              </div>
                              <ng-template #noLogsTpl>
                                <div class="muted">Aucun log detaille disponible.</div>
                              </ng-template>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </ng-container>
                </tbody>
              </table>
            </div>

            <mat-paginator
              [pageIndex]="pageIndex"
              [pageSize]="pageSize"
              [pageSizeOptions]="pageSizeOptions"
              [length]="paginatorLength"
              (page)="onPageChange($event)">
            </mat-paginator>
          </div>
        </app-panel-container>
      </div>
    </div>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: ["\n    .filters-grid {\n      display: grid;\n      grid-template-columns: repeat(3, minmax(0, 1fr));\n      gap: 0.85rem;\n    }\n    .filters-actions,\n    .pager-actions {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 0.75rem;\n    }\n    .hint-row,\n    .notice-card {\n      color: var(--text-secondary);\n    }\n    .notice-card {\n      display: grid;\n      gap: 0.3rem;\n      padding: 0.95rem 1rem;\n      border: 1px solid rgba(76, 201, 240, 0.2);\n      border-radius: var(--radius-md);\n      background: rgba(76, 201, 240, 0.06);\n    }\n    .notice-warn {\n      border-color: rgba(255, 180, 84, 0.24);\n      background: rgba(255, 180, 84, 0.08);\n    }\n    .table-block {\n      display: grid;\n      gap: 0.85rem;\n    }\n    .table-wrapper {\n      overflow: auto;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n    }\n    table {\n      width: 100%;\n      border-collapse: collapse;\n    }\n    th,\n    td {\n      padding: 0.9rem 1rem;\n      text-align: left;\n      vertical-align: top;\n      border-bottom: 1px solid var(--border-soft);\n    }\n    th {\n      color: var(--text-secondary);\n      font-weight: 700;\n      background: rgba(255, 255, 255, 0.02);\n    }\n    .message-cell,\n    .expanded-cell {\n      white-space: normal;\n      overflow-wrap: anywhere;\n      word-break: break-word;\n    }\n    .expanded-cell {\n      padding: 0;\n      background: rgba(8, 14, 25, 0.38);\n    }\n    .expanded-panel {\n      padding: 1rem;\n    }\n    .expanded-grid {\n      display: grid;\n      gap: 0.9rem;\n    }\n    .detail-card,\n    .resource-card,\n    .timeline-card,\n    .detail-section {\n      display: grid;\n      gap: 0.35rem;\n      padding: 0.9rem;\n      border: 1px solid var(--border-soft);\n      border-radius: var(--radius-md);\n      background: rgba(255, 255, 255, 0.03);\n    }\n    .detail-card {\n      grid-template-columns: 1fr;\n    }\n    .detail-card span,\n    .section-title {\n      color: var(--text-secondary);\n      font-size: 0.78rem;\n      text-transform: uppercase;\n      letter-spacing: 0.06em;\n    }\n    .resource-list,\n    .detail-list {\n      display: grid;\n      gap: 0.75rem;\n    }\n    .section-head {\n      display: flex;\n      align-items: center;\n      justify-content: space-between;\n      gap: 1rem;\n      flex-wrap: wrap;\n      margin-bottom: 0.6rem;\n    }\n    .monospace {\n      word-break: break-all;\n    }\n    @media (max-width: 1080px) {\n      .filters-grid {\n        grid-template-columns: 1fr;\n      }\n    }\n  "] }]
    }], () => [{ type: i1.FormBuilder }, { type: i2.OciService }, { type: i3.TimeRangeService }, { type: i0.ChangeDetectorRef }], null); })();
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassDebugInfo(OciWorkRequestsPageComponent, { className: "OciWorkRequestsPageComponent", filePath: "src\\app\\features\\oci\\oci-work-requests-page.component.ts", lineNumber: 380 }); })();
//# sourceMappingURL=oci-work-requests-page.component.js.map
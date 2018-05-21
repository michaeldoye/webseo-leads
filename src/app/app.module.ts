import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCheckboxModule, MatDialogModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule, MatBottomSheetModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule, MatProgressBarModule, MatSnackBarModule, MatBadgeModule, MatChipsModule, MatSelectModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ConfirmDialogComponent } from './core/confirm-dialog/confirm-dialog.component';
import { NavComponent } from './core/nav/nav.component';
import { LoadingOverlayComponent } from './core/loading-overlay/loading-overlay.component';
import { ScrollbarModule } from './core/scrollbar/scrollbar.module';
import { LoginComponent } from './core/login/login.component';
import { ButtonDeleteComponent } from './core/button-delete/button-delete.component';
import { InputAddTagComponent } from './core/input-add-tag/input-add-tag.component';
import { DashboardComponent } from './leads/dashboard/dashboard.component';
import { QuestionService } from './leads/lead-form/question.service';
import { DynamicFormQuestionComponent } from './leads/lead-form/lead-form-question.component';
import { DynamicFormComponent } from './leads/lead-form/lead-form.component';
import { LeadCalloutComponent } from './leads/lead-callout/lead-callout.component';
import { LeadsService } from './leads/leads.service';
import { DraggableDirective } from './core/draggable.directive';
import { DatatableComponent } from './leads/datatable/datatable.component';
import { DataTableDialogComponent } from './leads/datatable/dialog/datatable-dialog.compnent';
import { DataTableBottomSheet } from './leads/datatable/bottom-sheet/data-table-bottom-sheet.component';
import { LeadTagsComponent } from './leads/datatable/lead-tags/lead-tags-dialog.component';
import { EditLeadComponent } from './leads/datatable/edit-lead/edit-lead-dialog.component';
import { LeadStatsComponent } from './leads/lead-stats/lead-stats.component';
import { LeadCountsComponent } from './leads/lead-counts/lead-counts.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashboardComponent,
    DatatableComponent,
    DataTableDialogComponent,
    DataTableBottomSheet,
    LeadTagsComponent,
    EditLeadComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    LoadingOverlayComponent,
    ConfirmDialogComponent,
    ButtonDeleteComponent,
    DraggableDirective,
    InputAddTagComponent,
    LoginComponent,
    LeadStatsComponent,
    LeadCountsComponent,
    LeadCalloutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FlexLayoutModule,
    MatDialogModule,
    MatCheckboxModule,
    MatBottomSheetModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatChipsModule,
    MatSelectModule,
    ScrollbarModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  entryComponents: [
    DataTableDialogComponent,
    DataTableBottomSheet,
    LeadTagsComponent,
    EditLeadComponent,
    ConfirmDialogComponent
  ],
  providers: [
    LeadsService,
    QuestionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

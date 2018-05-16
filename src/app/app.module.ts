import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCheckboxModule, MatDialogModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule, MatBottomSheetModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule, MatProgressBarModule, MatSnackBarModule, MatBadgeModule, MatChipsModule, MatSelectModule } from '@angular/material';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DatatableComponent } from './datatable/datatable.component';
import { LeadsService } from './leads.service';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DataTableDialogComponent } from './datatable/dialog/datatable-dialog.compnent';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableBottomSheet } from './datatable/bottom-sheet/data-table-bottom-sheet.component';
import { LeadTagsComponent } from './datatable/lead-tags/lead-tags-dialog.component';
import { EditLeadComponent } from './datatable/edit-lead/edit-lead-dialog.component';
import { DynamicFormComponent } from './lead-form/lead-form.component';
import { DynamicFormQuestionComponent } from './lead-form/lead-form-question.component';
import { QuestionService } from './lead-form/question.service';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { ButtonDeleteComponent } from './user-actions/button-delete/button-delete.component';
import { DraggableDirective } from './draggable.directive';
import { InputAddTagComponent } from './user-actions/input-add-tag/input-add-tag.component';
import { LoginComponent } from './user-actions/login/login.component';
import { LeadStatsComponent } from './lead-stats/lead-stats.component';
import { LeadCountsComponent } from './lead-stats/lead-counts/lead-counts.component';
import { ScrollbarModule } from './scrollbar/scrollbar.module';

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
    ScrollbarModule
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

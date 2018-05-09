import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCheckboxModule, MatDialogModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatGridListModule, MatCardModule, MatMenuModule, MatTableModule, MatPaginatorModule, MatSortModule, MatBottomSheetModule, MatTooltipModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
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
    DynamicFormQuestionComponent
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
    MatNativeDateModule
  ],
  entryComponents: [
    DataTableDialogComponent,
    DataTableBottomSheet,
    LeadTagsComponent,
    EditLeadComponent
  ],
  providers: [
    LeadsService,
    QuestionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

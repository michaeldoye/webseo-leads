import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { EditLeadComponent } from '../edit-lead/edit-lead-dialog.component';
import { LeadTagsComponent } from '../lead-tags/lead-tags-dialog.component';
import { Leads, LeadsService } from '../../leads.service';

@Component({
  selector: 'datatable-dialog',
  templateUrl: 'datatable-dialog.component.html',
  styles: [`.lead-status-text{color:#888888}`
  ]
})
export class DataTableDialogComponent implements OnInit {

  leadData: Leads;

  constructor(
    public dialogRef: MatDialogRef<DataTableDialogComponent>,
    public dialog: MatDialog,
    public leadService: LeadsService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.leadData = this.data.data;
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(EditLeadComponent, {
      width: '750px',
      data: {data: this.leadData}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dialog.closeAll();
    });
  }

  openTagDialog(): void {
    let dialogRef = this.dialog.open(LeadTagsComponent, {
      width: '500px',
      data: {data: this.leadData}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dialogRef.close();
    });
  }

  openLink(leadData: Leads) {
    window.open(
      `https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&source=mailto&to=${leadData.emailAddress}&body=Hi ${leadData.personName}`,
      '_blank'
    );
  }

}
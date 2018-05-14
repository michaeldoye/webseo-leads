import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Leads } from '../../leads.service';
import { EditLeadComponent } from '../edit-lead/edit-lead-dialog.component';
import { LeadTagsComponent } from '../lead-tags/lead-tags-dialog.component';

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

}
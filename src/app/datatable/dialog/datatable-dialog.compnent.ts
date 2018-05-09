import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Leads } from '../../leads.service';

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
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    console.log(this.data.data);
    this.leadData = this.data.data;
  }  

}
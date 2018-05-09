import { Component, Inject } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MatDialog, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Leads } from '../../leads.service';
import { LeadTagsComponent } from '../lead-tags/lead-tags-dialog.component';
import { EditLeadComponent } from '../edit-lead/edit-lead-dialog.component';

@Component({
  selector: 'datatable-bottom-sheet',
  templateUrl: 'data-table-bottom-sheet.component.html',
})

export class DataTableBottomSheet {
  constructor(private bottomSheetRef: MatBottomSheetRef<DataTableBottomSheet>, 
    public dialog: MatDialog,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(LeadTagsComponent, {
      width: '500px',
      data: {data: this.data.data}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.bottomSheetRef.dismiss();
    });
  }

  openEditDialog(): void {
    let dialogRef = this.dialog.open(EditLeadComponent, {
      //panelClass: 'my-full-screen-dialog',
      width: '750px',
      data: {data: this.data.data}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.bottomSheetRef.dismiss();
    });
  }  
  
}
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDialogComponent } from '../../core/confirm-dialog/confirm-dialog.component';
import { LeadsService } from '../../leads/leads.service';

@Component({
  selector: 'app-button-delete',
  templateUrl: './button-delete.component.html',
  styleUrls: ['./button-delete.component.css']
})
export class ButtonDeleteComponent {

  @Input() leadsToDelete: Array<any>; 
  @Input() isBottomSheetButton: boolean;
  @Output() onDelete = new EventEmitter<boolean>();

  constructor(
    public api: LeadsService, 
    public snackbar: MatSnackBar,
    public dialog: MatDialog) { }

  removeLead() {
    let dataToDelete = {leads: this.leadsToDelete};
    this.api.deleteLead(dataToDelete).subscribe(data => {
      this.leadsToDelete = [];
      this.onDelete.emit(true);
      this.snackbar.open('Sucessfully Deleted', 'OK', 
        {duration: 3000, horizontalPosition: 'left'})}, 
    error => {
      console.log(error);
    });
  }

  confrimDelete(): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '550px',
      data: {item: this.leadsToDelete}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.removeLead();
      }
    });
  } 
}
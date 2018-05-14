import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LeadsService, Leads } from '../../leads.service';
import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-button-delete',
  templateUrl: './button-delete.component.html',
  styleUrls: ['./button-delete.component.css']
})
export class ButtonDeleteComponent implements OnInit {

  @Input() leadsToDelete: Array<any>; 
  @Output() onDelete = new EventEmitter<boolean>();;

  constructor(
    private api: LeadsService, 
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  removeLead() {
    this.leadsToDelete.forEach((id: number) => {
      this.api.deleteLead(id)
        .subscribe(data => {
          console.log(data);
          this.leadsToDelete = [];
          this.onDelete.emit(true);
        }, 
        error => {
          console.log(error);
        });
    });
  }

  confrimDelete(rowData: Leads): void {
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

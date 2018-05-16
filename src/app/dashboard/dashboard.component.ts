import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditLeadComponent } from '../datatable/edit-lead/edit-lead-dialog.component';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  cards = [
    { title: '', cols: 1, rows: 1, component: 'stats' },
    { title: 'All Leads', cols: 2, rows: 2, component: 'datatable' },
    { title: 'Leads Breakdown', cols: 1, rows: 1, component: 'count' },
    //{ title: 'Card 1', cols: 3, rows: 1, component: '' }
  ];

  doRefresh: boolean = false;
  maybeUpdate: boolean = false;

  constructor(public dialog: MatDialog) {} 

  openDialog(): void {
    let dialogRef = this.dialog.open(EditLeadComponent, {
      width: '750px',
      data: {data: {}}
    });
    dialogRef.afterClosed().subscribe(() => this.doRefresh = !this.doRefresh);
  }
  
  doUpdate() {
    this.maybeUpdate = !this.maybeUpdate;
  }
}

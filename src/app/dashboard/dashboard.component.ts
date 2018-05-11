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
    { title: 'Card 2', cols: 1, rows: 1, component: '' },
    { title: 'All Leads', cols: 2, rows: 2, component: 'datatable' },
    { title: 'Card 4', cols: 1, rows: 1, component: '' },
    //{ title: 'Card 1', cols: 3, rows: 1, component: '' }
  ];

  doRefresh: boolean = false;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(EditLeadComponent, {
      //panelClass: 'my-full-screen-dialog',
      width: '750px',
      data: {data: {}}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.doRefresh = !this.doRefresh;
    });
  }    
}

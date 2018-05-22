import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditLeadComponent } from '../datatable/edit-lead/edit-lead-dialog.component';
import { LeadsService } from '../leads.service';

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
  isFullScreen: boolean = false;
  doRefresh: boolean = false;
  maybeUpdate: boolean = false;
  tableHeight: string = '635px';

  constructor(public dialog: MatDialog, public leadService: LeadsService) {} 

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

  toggleFullScreen(): void {
    this.isFullScreen = !this.isFullScreen;
    if (this.isFullScreen) {
      this.tableHeight = 'calc(100vh - 220px)';
    }
    else {
      this.tableHeight = '635px';
    }
  }
}

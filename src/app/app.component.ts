import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { OverlayContainer } from '@angular/cdk/overlay';
import { WorkerService } from './core/worker.service';
import { StorageService } from './core/storage.service';
import { EditLeadComponent } from './leads/datatable/edit-lead/edit-lead-dialog.component';
import { LeadsService } from './leads/leads.service';
import { trigger, state, style, transition, group, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({opacity: 0})),
      transition(':leave', [
        style({opacity: 1}),
        group([
            animate('200ms ease-in-out', style({'opacity': '0'}))
        ])
      ]),
      transition(':enter', [
        style({opacity: 0}),
        group([
            animate('400ms ease-in-out', style({'opacity': '1'}))
        ])
      ])
    ])
  ]  
})
export class AppComponent {

  isDarkTheme: boolean;
  isLoggedIn: boolean = this.storage.get('loggedIn') || false;

  constructor(
    public dialog: MatDialog,
    private storage: StorageService,
    private worker: WorkerService,
    public leadService: LeadsService,
    public overlayContainer: OverlayContainer) {

      this.isDarkTheme = this.storage.get('isDarkTheme') || false;
      if (this.storage.get('isDarkTheme')) {
        this.overlayContainer
          .getContainerElement().classList.add('dark-theme');
      }
      this.worker.checkForUpdates();
  }

  changeTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    if(this.isDarkTheme) {
      this.overlayContainer
        .getContainerElement().classList.add('dark-theme');
      this.storage.set('isDarkTheme', true);
    } else {
      this.overlayContainer
        .getContainerElement().classList.remove('dark-theme');
      this.storage.set('isDarkTheme', false);
    }   
  } 
  
  openDialog(): void {
    let dialogRef = this.dialog.open(EditLeadComponent, {
      width: '750px',
      data: {data: {}}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // TODO refresh datatable
    });
  }
  
  checkLogin() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  logOut() {
    this.isLoggedIn = false;
    this.storage.set('loggedIn', false);
  }
}

import { Component } from '@angular/core';
import { EditLeadComponent } from './datatable/edit-lead/edit-lead-dialog.component';
import { MatDialog } from '@angular/material';
import { OverlayContainer } from '@angular/cdk/overlay';
import { StorageService } from './storage.service';
import { WorkerService } from './worker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'app';
  isDarkTheme: boolean;
  isLoggedIn: boolean = this.storage.get('loggedIn') || false;

  constructor(
    public dialog: MatDialog,
    private storage: StorageService,
    private worker: WorkerService,
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

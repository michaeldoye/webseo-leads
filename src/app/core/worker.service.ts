import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(public updates: SwUpdate, public snackBar: MatSnackBar) {
    if (updates.isEnabled) {
      interval(6 * 60 * 60).subscribe(() => updates.checkForUpdate());
    }
  }

  public checkForUpdates() {
    if (this.updates.isEnabled) {
      this.updates.available.subscribe(event => {
        console.log('current version is', event.current);
        console.log('available version is', event.available);
        this.promptUser(event);
      });
      this.updates.activated.subscribe(event => {
        console.log('old version was', event.previous);
        console.log('new version is', event.current);
      });
    }    
  }

  private promptUser(e): void {
    if(e.available) {
      let snackBarRef = this.snackBar.open(
        'A new version of the dashboard is available', 
        'Update',
        {duration: 10000000, horizontalPosition: 'left'}
      );
      snackBarRef.onAction().subscribe(() => document.location.reload());
    }
  }  

}

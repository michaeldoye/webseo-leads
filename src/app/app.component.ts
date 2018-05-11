import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  isDarkTheme: boolean = false;

  changeTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    // if (this.isDarkTheme) {
    //     this.isDarkTheme = false;
    // } else {
    //     this.isDarkTheme = true;
    // }
  }    
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StorageService } from '../../storage.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() onLogin = new EventEmitter();

  constructor(private storage: StorageService, public notification: MatSnackBar) { }

  pass: string;

  ngOnInit() {
  }

  doLogin(password: string) {
    if(password === '3477herb') {
      this.storage.set('loggedIn', true);
      this.onLogin.emit(true);
    } 
    else {
      this.openSnackBar('Invalid Password, please try again', 'OK');
    }
  }

  openSnackBar(message: string, action: string) {
    const snackBarRef = this.notification.open(
      message,
      action,
      {duration: 10000}
    )
  }
}
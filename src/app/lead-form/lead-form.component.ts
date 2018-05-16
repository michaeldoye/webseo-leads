import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';

import { QuestionBase }              from './question-base';
import { QuestionControlService }    from './question-control.service';
import { LeadsService } from '../leads.service';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './lead-form.component.html',
  styles: [`
  .form-row {
    position: absolute;
    bottom: 25px;
    right: 40px;
  }  
  `],
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';
  isLoading: boolean = false;

  constructor(
    private qcs: QuestionControlService, 
    private api: LeadsService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    this.isLoading = true;
    this.api.saveNewLead(this.form.value).subscribe(response => {
      console.log(response);
      this.isLoading = false;
      if(response.response === 1) {
        this.openSnackBar('Sucess! Lead Added', 'OK');
        this.dialog.closeAll();
      } 
      else if(response.response === 2) {
        this.openSnackBar('Success! Lead Updated', 'OK');
        this.dialog.closeAll();
      } 
      else {
        this.openSnackBar('There was an error, please try again', 'OK');
      }
    }, 
    (error: Error) => {
      console.log(error);
      this.isLoading = false;
      this.openSnackBar('There was an error, please try again.', 'OK');
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }  

}
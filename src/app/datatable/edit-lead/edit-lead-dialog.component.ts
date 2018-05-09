import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LeadsService, Leads } from '../../leads.service';
import { QuestionService } from '../../lead-form/question.service';

@Component({
  selector: 'lead-edit-dialog',
  templateUrl: 'edit-lead-dialog.component.html', 
})
export class EditLeadComponent implements OnInit {

  formFeilds: any[];
  
  constructor(
    public dialogRef: MatDialogRef<EditLeadComponent>,
    private api: LeadsService,
    private feilds: QuestionService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.formFeilds = feilds.getQuestions();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}

}

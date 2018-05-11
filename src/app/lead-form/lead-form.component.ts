import { Component, Input, OnInit }  from '@angular/core';
import { FormGroup }                 from '@angular/forms';

import { QuestionBase }              from './question-base';
import { QuestionControlService }    from './question-control.service';
import { LeadsService } from '../leads.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './lead-form.component.html',
  providers: [ QuestionControlService ]
})
export class DynamicFormComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = [];
  form: FormGroup;
  payLoad = '';
  isLoading: boolean = false;

  constructor(private qcs: QuestionControlService, private api: LeadsService) {  }

  ngOnInit() {
    this.form = this.qcs.toFormGroup(this.questions);
  }

  onSubmit() {
    this.isLoading = true;
    this.api.saveNewLead(this.form.value).subscribe(response => {
      console.log(response);
      this.isLoading = false;
    }, 
    (error: Error) => {
      console.log(error);
      this.isLoading = false;
    });
  }
}
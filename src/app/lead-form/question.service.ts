import { Injectable }       from '@angular/core';

import { DropdownQuestion } from './question-dropdown';
import { QuestionBase }     from './question-base';
import { TextboxQuestion }  from './question-textbox';

@Injectable()
export class QuestionService {

  // TODO: get from a remote source of question metadata
  // TODO: make asynchronous
  getQuestions() {

    let questions: QuestionBase<any>[] = [

      // new DropdownQuestion({
      //   key: 'brave',
      //   label: 'Bravery Rating',
      //   options: [
      //     {key: 'solid',  value: 'Solid'},
      //     {key: 'great',  value: 'Great'},
      //     {key: 'good',   value: 'Good'},
      //     {key: 'unproven', value: 'Unproven'}
      //   ],
      //   order: 3
      // }),

      new TextboxQuestion({
        key: 'companyName',
        label: 'Company Name',
        required: true,
        order: 1
      }),

      new TextboxQuestion({
        key: 'personName',
        label: 'Person Name',
        required: true,
        order: 2
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: 'Email Address',
        type: 'email',
        required: true,
        order: 3
      }),

      new TextboxQuestion({
        key: 'contactNumber',
        label: 'Contact Number',
        type: 'number',
        required: true,
        order: 4
      }),     
      
      new TextboxQuestion({
        key: 'requestedServices',
        label: 'Requested Services',
        required: true,
        order: 5
      }),
      
      new TextboxQuestion({
        key: 'source',
        label: 'Source',
        required: true,
        order: 6
      }),       

      new TextboxQuestion({
        key: 'leadDate',
        label: 'Lead Date',
        type: 'date',
        required: true,
        order: 7
      }),

      new TextboxQuestion({
        key: 'firstContact',
        label: 'First Contact Date',
        type: 'date',
        required: false,
        order: 8
      }),
      
      new TextboxQuestion({
        key: 'hasMeeting',
        label: 'Has Meeting',
        required: true,
        order: 9
      }), 
      
      new TextboxQuestion({
        key: 'quotedDate',
        label: 'Quoted Date',
        type: 'date',
        required: false,
        order: 10
      }), 
      
      new TextboxQuestion({
        key: 'currentStatus',
        label: 'Current Status',
        required: true,
        order: 9
      }),      

    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}
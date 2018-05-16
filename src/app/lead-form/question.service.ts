import { Injectable }       from '@angular/core';

import { DropdownQuestion } from './question-dropdown';
import { QuestionBase }     from './question-base';
import { TextboxQuestion }  from './question-textbox';
import { DateQuestion } from './question-date';

@Injectable()
export class QuestionService {

  // TODO: get from a remote source of question metadata
  // TODO: make asynchronous
  getQuestions(data: any) {

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
        value: data.companyName || '',
        key: 'companyName',
        label: 'Company Name',
        required: true,
        order: 2
      }),

      new TextboxQuestion({
        value: data.personName || '',
        key: 'personName',
        label: 'Person Name',
        required: true,
        order: 3
      }),

      new TextboxQuestion({
        value: data.emailAddress || '',
        key: 'emailAddress',
        label: 'Email Address',
        type: 'email',
        required: false,
        order: 5
      }),

      new TextboxQuestion({
        value: data.emailAddress || '',
        key: 'websiteAddress',
        label: 'Webstie Address',
        required: false,
        order: 11
      }),      

      new TextboxQuestion({
        value: data.contactNumber || '',
        key: 'contactNumber',
        label: 'Contact Number',
        type: 'text',
        required: false,
        order: 4
      }),     
      
      new TextboxQuestion({
        value: data.requestedServices || '',
        key: 'requestedServices',
        label: 'Requested Services',
        required: false,
        order: 10
      }),
      
      new TextboxQuestion({
        value: data.source || '',
        key: 'source',
        label: 'Source',
        required: false,
        order: 6
      }),       

      new DateQuestion({
        value: data.leadDate || '',
        key: 'leadDate',
        label: 'Lead Date',
        required: false,
        order: 1
      }),

      new DateQuestion({
        value: data.firstContact || '',
        key: 'firstContact',
        label: 'First Contact Date',
        required: false,
        order: 7        
      }),
      
      new TextboxQuestion({
        value: data.hasMeeting || '',
        key: 'hasMeeting',
        label: 'Has Meeting',
        required: false,
        order: 8
      }), 
      
      new DateQuestion({
        value: data.quotedDate || '',
        key: 'quotedDate',
        label: 'Quoted Date',
        required: false,
        order: 9
      }), 
      
      new TextboxQuestion({
        value: data.currentStatus || '',
        key: 'currentStatus',
        label: 'Current Status',
        required: false,
        order: 12
      }),
      
      new TextboxQuestion({
        value: data.tags ? data.tags.replace(/['"]+/g, '') : '' || '',
        key: 'tags',
        label: 'Tags',
        required: false,
        hint: 'comma seperated eg: seo,dev,ppc',
        order: 13
      }),       

    ];

    return questions.sort((a, b) => a.order - b.order);
  }
}
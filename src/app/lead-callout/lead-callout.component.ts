import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-lead-callout',
  templateUrl: './lead-callout.component.html',
  styleUrls: ['./lead-callout.component.css']
})
export class LeadCalloutComponent implements OnInit {

  @Input() message: string;
  @Input() icon: string;
  @Input() class: string;

  constructor() { }

  ngOnInit() {
  }

}

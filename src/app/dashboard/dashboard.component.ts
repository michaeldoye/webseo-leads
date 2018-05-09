import { Component } from '@angular/core';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  cards = [
    { title: 'Card 1', cols: 3, rows: 1, component: '' },
    { title: 'Card 2', cols: 1, rows: 1, component: '' },
    { title: 'Card 3', cols: 2, rows: 2, component: 'datatable' },
    { title: 'Card 4', cols: 1, rows: 1, component: '' }
  ];
}

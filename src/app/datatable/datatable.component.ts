import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatBottomSheet } from '@angular/material';
import { DatatableDataSource } from './datatable-datasource';
import { LeadsService, Leads } from '../leads.service';
import { DataTableDialogComponent } from './dialog/datatable-dialog.compnent';
import { DataTableBottomSheet } from './bottom-sheet/data-table-bottom-sheet.component';

@Component({
  selector: 'datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit, OnChanges {

  @Input() shouldRefresh: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Leads[]>
  allLeads: Array<Leads> = [];

  displayedColumns = ['checkbox', 'id', 'companyName', 'personName', 'emailAddress', 'tags', 'actions'];

  checkAll: any;
  selectedPosts: Array<number> = [];  

  constructor(private api: LeadsService, public dialog: MatDialog, private bottomSheet: MatBottomSheet) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.firstChange) return;
    this.getTableData();
  }

  ngOnInit(): void {
    this.getTableData();
  }

  getTableData(): void {
    this.api.dbGetLeads().subscribe((data: any) => {  
      this.allLeads = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });    
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(rowData: Leads): void {
    let dialogRef = this.dialog.open(DataTableDialogComponent, {
      width: '750px',
      data: {data: rowData}
    });
  }

  doCheckAll(value: boolean): void {
    if (value) this.selectedPosts = [];
    this.allLeads.forEach((lead: Leads) => {
      lead.isChecked = value;
      if (value) {
        this.selectedPosts.push(lead.id);
      } else {
        this.selectedPosts = [];
      }
    })
  }

  doSinglePostSelection(id: number, isChecked: boolean): void {
    if (isChecked) {
      this.selectedPosts.push(id);
    } else {
      let indx = this.selectedPosts.indexOf(id);
      if (indx > -1) this.selectedPosts.splice(indx, 1);
    }
  }  

  isAllChecked(): boolean {
    return this.allLeads.every((lead: Leads) => lead.isChecked);
  }

  openBottomSheet(leadData: Leads): void {
    let bottomSheet = this.bottomSheet.open(DataTableBottomSheet, {
      data: {data: leadData}
    });
    bottomSheet.afterDismissed().subscribe(result => {
      this.getTableData();
    });
  } 


  getRowTags(tags) {
    return tags.replace(/['"]+/g, '').split(',');
  }

}

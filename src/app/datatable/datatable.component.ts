import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatBottomSheet, MatSortable } from '@angular/material';
import { DatatableDataSource } from './datatable-datasource';
import { LeadsService, Leads } from '../leads.service';
import { DataTableDialogComponent } from './dialog/datatable-dialog.compnent';
import { DataTableBottomSheet } from './bottom-sheet/data-table-bottom-sheet.component';
import { LeadTagsComponent } from './lead-tags/lead-tags-dialog.component';

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
  selectedLeads: Array<number> = [];
  isLoading: boolean = false;

  constructor(
    private api: LeadsService, 
    public dialog: MatDialog, 
    private bottomSheet: MatBottomSheet) {

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
    this.isLoading = true;
    this.api.dbGetLeads().subscribe((data: any) => {  
      this.allLeads = data;
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.selectedLeads = [];
      this.isLoading = false;
    }, error => console.log(error));    
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
    dialogRef.afterClosed().subscribe(result => {
      this.getTableData();
    });
  }

  doCheckAll(value: boolean): void {
    if (value) this.selectedLeads = [];
    this.allLeads.forEach((lead: Leads) => {
      lead.isChecked = value;
      if (value) {
        this.selectedLeads.push(lead.id);
      } else {
        this.selectedLeads = [];
      }
    })
  }

  doSinglePostSelection(id: number, isChecked: boolean): void {
    if (isChecked) {
      this.selectedLeads.push(id);
    } else {
      let indx = this.selectedLeads.indexOf(id);
      if (indx > -1) this.selectedLeads.splice(indx, 1);
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

  getRowTags(tags): Array<any> {
    return tags.replace(/['"]+/g, '').split(',');
  }

  removeTag(rowData: Leads, tag: string) {
    let alltags = this.getRowTags(rowData.tags);
    let tags = alltags.filter(t => t !== tag);
    this.api.dbAddTagToLead(tags.toString(), rowData.id)
      .subscribe(res => this.getTableData(), error => console.log(error));
    return false;
  }


  openTagDialog(rowData: Leads): void {
    let dialogRef = this.dialog.open(LeadTagsComponent, {
      width: '500px',
      data: {data: rowData}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getTableData();
    });
  }

}

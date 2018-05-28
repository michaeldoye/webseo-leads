import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatBottomSheet, MatSortable, MatSnackBar, MatIconRegistry, MatSelectChange } from '@angular/material';
import { DatatableDataSource } from './datatable-datasource';
import { DataTableDialogComponent } from './dialog/datatable-dialog.compnent';
import { DataTableBottomSheet } from './bottom-sheet/data-table-bottom-sheet.component';
import { LeadTagsComponent } from './lead-tags/lead-tags-dialog.component';
import { LeadsService, Leads } from '../leads.service';
import { DomSanitizer } from '@angular/platform-browser';
import { StorageService } from '../../core/storage.service';
import { interval } from 'rxjs';
import { TableCols, TableCol, DefaultCols, DefaultTags } from './datatable-cols.class';
import * as moment from 'moment'; 

@Component({
  selector: 'datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']   
})
export class DatatableComponent implements OnInit, OnChanges {

  @Input() shouldRefresh: boolean;
  @Input() tableHeight: string;

  @Output() onRefresh = new EventEmitter<boolean>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Leads[]>
  allLeads: Array<Leads> = [];

  displayedColumns = this.storage.get('tableCols') || new DefaultCols().cols;
  allcols: TableCol[] = new TableCols().cols;
  allTags: Array<any> = new DefaultTags().tags;

  checkAll: any;
  selectedLeads: Array<number> = [];

  isLoading: boolean = false;
  tagFilter: any = '';

  constructor(
    public api: LeadsService, 
    public dialog: MatDialog, 
    public snackBar: MatSnackBar,
    public iconRegistry: MatIconRegistry, 
    public sanitizer: DomSanitizer,
    public storage: StorageService,
    private bottomSheet: MatBottomSheet) {

      this.dataSource = new MatTableDataSource();
      let lableIcon = sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-label-24px.svg');
      let lableIconOff = sanitizer.bypassSecurityTrustResourceUrl('assets/baseline-label_off-24px.svg');
      iconRegistry.addSvgIcon('label', lableIcon);
      iconRegistry.addSvgIcon('label_off', lableIconOff);
      interval(900000).subscribe(() => this.checkForNewLeads());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.firstChange || changes.tableHeight) return;
    this.getTableData();
  }

  ngOnInit(): void {   
    this.getTableData();
  }

  getTableData(): void {
    this.isLoading = true;
    if (this.api.checkNetworkStatus) {
      this.api.dbGetLeads()
        .subscribe((data: any) => this.initializeTable(data), 
        error => this.isLoading = false); 
    } else { this.handleTableOfflineError() }   
  }

  private initializeTable(data): void {
    let filteredLeads = data.filter(lead => {
      return lead.tags.indexOf('is client') === -1}); 
    this.allLeads = data;
    this.dataSource = new MatTableDataSource(filteredLeads);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.selectedLeads = [];
    this.tagFilter = '';
    this.storage.set('tableData', filteredLeads);
    this.isLoading = false;
    this.onRefresh.emit(true);
  }

  private handleTableOfflineError(): void {
    let cachedLeads = this.storage.get('tableData');
    this.dataSource = new MatTableDataSource(cachedLeads);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;  
    this.isLoading = false;
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  openDialog(rowData: Leads): void {
    let dialogRef = this.dialog.open(DataTableDialogComponent, {
      width: '850px',
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

  removeTag(rowData: Leads, tag: string): void {
    if (!this.api.checkNetworkStatus) return;
    let alltags = this.getRowTags(rowData.tags);
    let tags = alltags.filter(t => t !== tag);
    this.api.dbAddTagToLead(tags.toString(), rowData.id)
      .subscribe(res => this.getTableData(), error => console.log(error));
  }

  openTagDialog(rowData: Leads): void {
    if (!this.api.checkNetworkStatus) return;
    let dialogRef = this.dialog.open(LeadTagsComponent, {
      width: '600px',
      data: {data: rowData}
    });
    dialogRef.afterClosed().subscribe(() => this.getTableData());
  }

  onTagFilterChange(selected: MatSelectChange): void {
    if(!selected.value) {
      this.getTableData();
    }
    else {
      let filteredLeads: any = this.allLeads.filter(el => {
        return el.tags.indexOf(selected.value) > -1;
      })
      this.dataSource = new MatTableDataSource(filteredLeads);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  checkForNewLeads() {
    const currentLeadCount = this.allLeads.length;
    this.api.dbGetLeads()
      .subscribe(data => {
        let newLeadCount = data.length;
        if (newLeadCount > currentLeadCount) {
          let snackRef = this.snackBar.open(
            'New Lead found',
            'Refresh Table',
            {duration: 10000000, horizontalPosition: 'left'}
          );
          snackRef.onAction().subscribe(() => this.getTableData());
        }
      });
  }

  onColumnSelect(selected: MatSelectChange) {
    this.displayedColumns = selected.value;
    this.storage.set('tableCols', selected.value);
  }

  getFormattedDateWithTime(date) {
    return date === '' ? '' : moment(date).format('ddd do MMM HH:mm:ss');
  }

  getFormattedDate(date) {
    return date === '' ? '' : moment(date).format('ddd do MMM');
  }  
}
import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { LeadsService, Leads } from '../leads.service';
import { StorageService } from '../../core/storage.service';

@Component({
  selector: 'app-lead-counts',
  templateUrl: './lead-counts.component.html',
  styleUrls: ['./lead-counts.component.css']
})
export class LeadCountsComponent implements OnInit {

  @Input() public shouldRefresh: boolean;

  public leadsCount: number;
  public leads: Leads[];
  public isLoading: boolean;  

  constructor(
    private leadService: LeadsService,
    private storage: StorageService
  ) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if(changes.firstChange) return;
    this.allLeads();
  }  

  public ngOnInit(): void {
    this.allLeads();
  }

  private allLeads(): void {
    this.isLoading = true;
    if (this.leadService.checkNetworkStatus) {
      this.leadService.dbGetLeads()
        .subscribe((data: any) => {
          this.leadsCount = data.length;
          this.leads = data;
          this.storage.set('leads', data);
          this.isLoading = false;
        });
    }
    else {
      this.leads = this.storage.get('leads') || [];
      this.leadsCount = this.leads.length;
      this.isLoading = false;
    }
  }

  public get seoLeads(): Leads[] {
    return this.leads.filter(lead => lead.tags.indexOf('seo') > -1);
  }
  
  public get devLeads(): Leads[] {
    return this.leads.filter(lead => lead.tags.indexOf('dev') > -1);
  }

  public get socialLeads(): Leads[] {
    return this.leads.filter(lead => lead.tags.indexOf('social') > -1);
  } 

  public get ppcLeads(): Leads[] {
    return this.leads.filter(lead => lead.tags.indexOf('ppc') > -1);
  }
  
  public percentageOfAllLeads(percentageOf: number, divideInto: number): number {
    return percentageOf / divideInto * 100;
  }

}

import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LeadsService, Leads } from '../leads.service';
import { StorageService } from '../../core/storage.service';


@Component({
  selector: 'app-lead-stats',
  templateUrl: './lead-stats.component.html',
  styleUrls: ['./lead-stats.component.css']
})
export class LeadStatsComponent implements OnInit, OnChanges {

  @Input() public shouldRefresh: boolean;

  public leadsCount: number;
  public leads: Leads[];
  public isLoading: boolean;

  constructor(private leadService: LeadsService, public storage: StorageService) { }

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
          this.isLoading = false;
        });
    }
    else {
      this.leads = this.storage.get('leads') || [];
      this.leadsCount = this.leads.length;
      this.isLoading = false;
    }
  }

  public get convertedLeads(): Leads[] {
    return this.leads.filter(lead => lead.tags.indexOf('is client') > -1);
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

  public get conversionRate(): number {
    return this.convertedLeads.length / this.leadsCount * 100;
  }

  public get conversionTooltip(): string {
    return `Out of ${this.leadsCount} leads, so far ${this.convertedLeads.length} have converted into clients`;
  }

}

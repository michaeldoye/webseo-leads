import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  private api: string = 'https://api.webseo.co.za/leads'

  constructor(private http: HttpClient) { }

  public dbGetLeads(): Observable<Leads> {
    return this.http.get<Leads>(this.api);
  }

  public dbAddTagToLead(tag: string, id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/add/${tag}/${id}`);
  }

  public dbGetLeadTags(id: number) {
    
  }
}

export interface Leads {
  id: number,
  leadDate: string,
  companyName: string,
  personName: string,
  contactNumber: string,
  emailAddress: string,
  websiteAddress: string,
  source: string,
  firstContact: string,
  hasMeeting: string,
  quotedDate: string,
  requestedServices: string,
  currentStatus: string,
  isChecked?: boolean
}
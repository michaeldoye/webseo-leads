import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  private api: string = 'https://api.webseo.co.za/leads'

  constructor(private http: HttpClient) { }

  public dbGetLeads(): Observable<Leads> {
    return this.http.get<Leads>(this.api)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  public dbAddTagToLead(tag: string, id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/add/${tag}/${id}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  public dbGetLeadTags(id: number) {}

  public saveNewLead(lead: Leads): Observable<any> {
    lead.tags = 'manual';
    return this.http.get(`${this.api}/addnew/${JSON.stringify(lead)}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );    
  }

  public deleteLead(id: number): Observable<any> {
    return this.http.get(`${this.api}/delete/${id}`)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

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
  tags: string,
  isChecked?: boolean
}
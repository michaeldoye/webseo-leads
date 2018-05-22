import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError, fromEvent, merge, of } from 'rxjs';
import { catchError, retry, mapTo, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeadsService {

  private api: string = 'https://api.webseo.co.za/leads'
  private online$: Observable<boolean>;
  public isOnline: boolean;

  constructor(private http: HttpClient) {
    this.online$ = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    )
    this.online$.subscribe((networkStatus) => {
      this.isOnline = networkStatus;
      console.log(networkStatus);
    });    
  }

  public dbGetLeads(): Observable<Leads> {
    return this.http.get<Leads>(this.api)
      .pipe(
        retry(3),
        catchError(this.handleError)
      )
  }

  public dbAddTagToLead(tag: string, id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/add/${tag ? tag+'/' : ''}${id}`)
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

  public get checkNetworkStatus(): boolean {
    return this.isOnline; 
  }

  public addLead(data: Leads): Observable<any> {
    if(!data.tags) data.tags = 'manual';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this.http.post<Leads>('https://api.webseo.co.za/newlead', data, httpOptions)
      .pipe(
        retry(2),
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
  isChecked?: boolean,
  length?: number
}
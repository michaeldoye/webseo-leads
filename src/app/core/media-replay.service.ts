import { Injectable } from '@angular/core';
import { MediaChange, ObservableMedia } from "@angular/flex-layout";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MediaReplayService {

  private _media$: Subject<MediaChange> = new Subject();

  constructor(media:ObservableMedia) {
    media.asObservable()
      .subscribe(res => this._media$.next(res), err => this._media$.error(err), () => this._media$.complete());
  }

  get media$(): Observable<MediaChange> {
    return this._media$.asObservable();
  }
}

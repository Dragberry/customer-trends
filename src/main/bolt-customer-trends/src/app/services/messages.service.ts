import { Injectable } from '@angular/core';
import { Subscriber, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  subscriber: Subscriber<string>;
  source: Observable<string>;

  constructor() {
    this.source = Observable.create((subscriber: Subscriber<string>) => this.subscriber = subscriber);
  }

  showError(error: any): void {
    this.subscriber.next('An error has occurred: ' + error.status);
  }
}

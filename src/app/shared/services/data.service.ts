import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

  private title = new BehaviorSubject<string>('');
  private notifications = new BehaviorSubject<any>({});

  constructor() { }

  getTitle(): Observable<string> {
    return this.title.asObservable();
  }
  updateTitle(title: string) {
    this.title.next(title);
  }

  getNotifications(): Observable<any> {
    return this.notifications.asObservable();
  }
  setNotifications(type: string, message: string) {
    this.notifications.next({
      type: type,
      message: message
    });
  }
}

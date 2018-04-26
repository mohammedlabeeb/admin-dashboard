import { DataService } from './../services/data.service';
import { Directive, OnInit, OnDestroy } from '@angular/core';
declare var $: any;

@Directive({
  selector: '[appNotification]'
})
export class NotificationDirective implements OnInit, OnDestroy {

  private observer;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.observer = this.dataService.getNotifications().subscribe(item => {
      if (item && item.type && item.message) {
        this.showNotification(item.type, item.message);
      }
    });
  }

  private showNotification(type = 'info', message) {

    $.notify({
      icon: 'notifications',
      message: message

    }, {
        type: type,
        timer: 4000,
        placement: {
          from: 'top',
          align: 'center'
        }
      });
  }

  ngOnDestroy() {
    this.observer.unsubscribe();
  }
}

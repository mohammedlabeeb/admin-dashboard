import { Component, OnInit, Input, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit, OnChanges {

  @Input() title = '';
  @Input() modalID = false;
  @Input() button = '';
  @Input() modalVisibility: BehaviorSubject<any>;
  target = '';
  showButton = false;
  constructor(private elRef: ElementRef) { }

  ngOnInit() {
    this.showButton = this.button && this.button !== '' ? true : false;
    this.target = `#${this.modalID}`;
    this.modalVisibility.subscribe(status => {
      if (status) {
        this.elRef.nativeElement.querySelector(`#${this.modalID}-button`).click();
      } else {
        this.elRef.nativeElement.querySelector('.modalClose').click();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes) {
      this.title = changes['title'] && changes['title'].currentValue || this.title;
      this.button = changes['button'] && changes['button'].currentValue || this.button;
      this.showButton = this.button && this.button !== '' ? true : false;
      console.log('changes', this);
    }

  }

}

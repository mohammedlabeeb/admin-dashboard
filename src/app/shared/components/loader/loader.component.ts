import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input() lines: any = '3';
  numbers: any[] = [];

  constructor() { }

  ngOnInit() {
    this.makeArray();
  }

  private makeArray() {
    this.numbers = Array(parseInt(this.lines, 10)).fill(0);
  }

}

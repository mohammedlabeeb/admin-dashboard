import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../../../shared/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  siteTitle = '';
  private observe;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.observe = this.data.getTitle().subscribe(title => this.siteTitle = title);
  }
  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.observe.unsubscribe();
  }

}

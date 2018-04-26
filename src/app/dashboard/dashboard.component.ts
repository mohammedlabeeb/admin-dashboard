// import { DataService } from './../shared/services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    // private dataService: DataService
  ) { }

  ngOnInit() {
    // this.dataService.getModalVisibility().subscribe(item => {
    //   if (item.status) {
    //     document.getElementById(`${item.modalID}-button`).click();
    //   } else {
    //     document.getElementById(`closeModal`).click();
    //   }
    // });
  }

}

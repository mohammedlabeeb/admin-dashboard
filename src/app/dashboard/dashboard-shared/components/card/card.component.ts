import { Component, OnInit, Input } from '@angular/core';
import { OverviewCard } from '../../types/dashboard';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() cardData: OverviewCard;



  constructor() { }

  ngOnInit() {

  }

}

import { Component, OnInit, Input } from '@angular/core';
import { PropertyThumb } from '../../types/dashboard';
@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent implements OnInit {


  @Input('cardData')

  set in(data) {
    this.setCardData(data);
  }
  cardData: any = {};
  constructor() { }

  ngOnInit() {
  }

  private setCardData(data) {
    const cardData: PropertyThumb = {
      id: data.property_log_id || data.property_unique_id || '',
      title: `${data.PropertyAddressFull},
      ${data.PropertyAddressCity} ${data.PropertyAddressZIP} ${data.PropertyAddressState}`,
      thumb: data.banner_thumbnail_URL || data.banner_photo_URL || 'assets/img/property-placeholder.jpg',
      url: `https://majordomo.com/property/${data.property_log_id}`,
      claimed: data.is_owner
    };
    this.cardData = cardData;
  }

}

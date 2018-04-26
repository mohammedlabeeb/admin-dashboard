import { Component, OnInit } from '@angular/core';
import { OverviewCard } from '../dashboard-shared/types/dashboard';
import { DataService } from '../../shared/services/data.service';

import { OverviewService } from '../dashboard-shared/services/overview.service';
import { CacheService } from '../dashboard-shared/services/cache.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})

export class OverviewComponent implements OnInit {

  overViewCardList: any[] = [];
  showLoader = true;
  constructor(
    private dataService: DataService,
    private overviewService: OverviewService,
    private cache: CacheService
  ) { }

  ngOnInit() {
    this.dataService.updateTitle('Dashboard Overview');
    this.showLoader = true;
    const data = this.cache.getOverview() || null;
    if (data) {
      this.loadCardData(data);
    } else {
      this.overviewService.getOverviewScores().then(data => {
        this.cache.setOverview(data);
        this.loadCardData(data);
      }).catch(error => {
        this.showLoader = false;
        console.log('Error Happend', error);
      });
    }

  }

  private loadCardData(data) {
    if (data) {
      let cardItem: OverviewCard = {
        type: 'card-stats',
        color: 'green',
        icon: 'perm_identity',
        category: 'Total Users',
        title: data.users,
        footer: {
          icon: 'search',
          text: 'Find Users',
          link: ''
        }
      };
      this.overViewCardList.push(cardItem);

      // cardItem = {
      //   type: 'card-stats',
      //   color: 'orange',
      //   icon: 'account_circle',
      //   category: 'Over Time Users',
      //   title: '12',
      //   footer: {
      //     icon: 'search',
      //     text: 'Find Users',
      //     link: ''
      //   }
      // };
      // this.overViewCardList.push(cardItem);

      cardItem = {
        type: 'card-stats',
        color: 'red',
        icon: 'home',
        category: 'Properties',
        title: data.propertis,
        footer: {
          icon: 'search',
          text: 'Find Properties',
          link: ''
        }
      };
      this.overViewCardList.push(cardItem);

      cardItem = {
        type: 'card-stats',
        color: 'blue',
        icon: 'trending_up',
        category: 'Domoscore',
        title: parseInt(data.actualDS, 10).toString(),
        footer: {
          icon: 'update',
          text: 'Just Updated',
          link: ''
        }
      };
      this.overViewCardList.push(cardItem);

      cardItem = {
        type: 'card-stats',
        color: 'green',
        icon: 'check_circle',
        category: 'Claimed Properties',
        title: data.claimed,
        footer: {
          icon: 'update',
          text: 'Just Updated',
          link: ''
        }
      };
      this.overViewCardList.push(cardItem);

      cardItem = {
        type: 'card-stats',
        color: 'red',
        icon: 'check_circle',
        category: 'Unlaimed Properties',
        title: data.unclaimed,
        footer: {
          icon: 'update',
          text: 'Just Updated',
          link: ''
        }
      };
      this.overViewCardList.push(cardItem);
      cardItem = {
        type: 'card-stats',
        color: 'purple',
        icon: 'collections',
        category: 'Property Banners',
        title: data.hasBanners,
        footer: {
          icon: 'update',
          text: 'Just Updated',
          link: ''
        }
      };
      this.overViewCardList.push(cardItem);

      // cardItem = {
      //   type: 'card-stats',
      //   color: 'orange',
      //   icon: 'description',
      //   category: '# Times Details Added',
      //   title: '123',
      //   footer: {
      //     icon: 'update',
      //     text: 'Just Updated',
      //     link: ''
      //   }
      // };
      // this.overViewCardList.push(cardItem);

      this.showLoader = false;
    }
  }

}

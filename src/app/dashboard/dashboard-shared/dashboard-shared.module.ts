import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationComponent } from './components/navigation/navigation.component';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';

import { OverviewService } from './services/overview.service';
import { UserService } from './services/user.service';
import { CacheService } from './services/cache.service';
import { PropertyCardComponent } from './components/property-card/property-card.component';

@NgModule({
  imports: [
    CommonModule, RouterModule
  ],
  declarations: [NavigationComponent, HeaderComponent, CardComponent, PropertyCardComponent],
  providers: [OverviewService, UserService, CacheService],
  exports: [NavigationComponent, HeaderComponent, CardComponent, PropertyCardComponent]
})
export class DashboardSharedModule { }

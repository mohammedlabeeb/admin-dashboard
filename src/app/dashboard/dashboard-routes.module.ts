import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { OverviewComponent } from './overview/overview.component';

import { UsersComponent } from './users/users.component';
import { UserViewComponent } from './users/user-view/user-view.component';

import { PropertiesComponent } from './properties/properties.component';

const dashboardRoutes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        component: OverviewComponent,
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'user/:user_id',
        component: UserViewComponent
      },
      {
        path: 'properties',
        component: PropertiesComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutesModule { }

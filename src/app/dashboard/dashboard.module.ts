import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutesModule } from './/dashboard-routes.module';
import { DashboardComponent } from './dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { DashboardSharedModule } from './dashboard-shared/dashboard-shared.module';
import { UsersComponent } from './users/users.component';
import { PropertiesComponent } from './properties/properties.component';
import { DataTableModule } from '../shared/libs/data-table';
import { DeclarableModule } from '../shared/shared.module';
import { UserViewComponent } from './users/user-view/user-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutesModule,
    DashboardSharedModule,
    DataTableModule,
    DeclarableModule
  ],
  declarations: [DashboardComponent, OverviewComponent, UsersComponent, PropertiesComponent, UserViewComponent],
  exports: [DashboardComponent, OverviewComponent, UsersComponent, PropertiesComponent]
})
export class DashboardModule { }

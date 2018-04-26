import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MajordomoInterceptorService } from './services/majordomo-interceptor.service';
import { HttpService } from './services/http.service';
import { DataService } from './services/data.service';
import { DataTableModule } from './libs/data-table/index';
import { AuthGuard } from './guards/auth.guard';
import { LoaderComponent } from './components/loader/loader.component';
import { ModalComponent } from './components/modal/modal.component';
import { NotificationDirective } from './directive/notification.directive';
import { SortPipe } from './pipes/sort.pipe';

const interceptor = {
  provide: HTTP_INTERCEPTORS,
  useClass: MajordomoInterceptorService,
  multi: true
};
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoaderComponent,
    ModalComponent,
    NotificationDirective,
    SortPipe
  ],
  exports: [
    LoaderComponent,
    ModalComponent,
    NotificationDirective,
    SortPipe
  ]
})
export class DeclarableModule { }

@NgModule({
  imports: [
    CommonModule,
    DataTableModule,
    HttpClientModule,
    DeclarableModule
  ],
  declarations: [
  ],
  providers: [
    HttpClient,
    HttpService,
    DataService,
    AuthGuard,
    interceptor,
    SortPipe
  ],
  exports: []
})
export class SharedModule { }

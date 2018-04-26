import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    console.log('Auth Reeached');
    if (sessionStorage.getItem('majordomo-token') && sessionStorage.getItem('majordomo-admin')) {
      console.log('Auth True');
      return true;
    } else {
      console.log('Auth False');
      return false;
    }
  }
}

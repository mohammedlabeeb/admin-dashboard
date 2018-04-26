import { Injectable } from '@angular/core';

import { HttpService } from '../../../shared/services/http.service';

@Injectable()
export class OverviewService {

  constructor(
    private httpService: HttpService
  ) { }

  getOverviewScores(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.httpService.get('overview').subscribe(value => {
          return resolve(value);
        }, error => {
          return reject(error);
        });
      } catch (err) {
        return reject(err);
      }
    });
  }

}

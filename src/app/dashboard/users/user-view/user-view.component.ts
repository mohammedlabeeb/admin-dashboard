import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../dashboard-shared/services/user.service';
import { CacheService } from '../../dashboard-shared/services/cache.service';
import { DataService } from '../../../shared/services/data.service';
import { UserList, Error } from '../../dashboard-shared/types/dashboard';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  private userId;
  userData: UserList;
  error: Error = {
    type: '',
    message: '',
    status: false
  };
  properties: any;
  constructor(
    private dataService: DataService,
    private userService: UserService,
    private cache: CacheService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params && params['user_id'] || '';
      if (this.userId && this.userId !== '') {
        this.initData();
      } else {
        this.error.status = true;
        this.error.message = 'Invalid user';
        this.error.type = 'error';
      }
    });

  }

  private async initData() {
    let user = this.cache.getUser(this.userId) || null;
    if (!user) {
      [user] = await this.userService.getUser(this.userId);
    }
    if (user) {
      this.loadData(user);
    } else {
      this.error.status = true;
      this.error.message = 'Cannot fetch User Data';
      this.error.type = 'error';
    }
  }


  private loadData(userData) {
    this.userData = {
      name: `${userData.user_first_name} ${userData.user_last_name}`,
      email: userData.user_email,
      age: userData.user_age,
      userId: userData.user_log_id,
      uniqueId: userData.user_unique_id,
      date: userData.user_timestamp,
      verified: userData.user_email_verified ? true : false,
      private: userData.user_privacy_set ? true : false,
      properties: userData.properties !== null ? userData.properties : 0,
      claimed: userData.claimed !== null ? userData.claimed : 0,
    };
    this.dataService.updateTitle(`User : ${this.userData.name}`);
    console.log(this.userData);
    if (this.userData.properties || this.userData.claimed) {
      this.loadUserProperties();
    }
  }

  private async loadUserProperties() {
    this.properties = await this.userService.getProperties(this.userId);
  }

}

import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {

  private overview: any;
  private users: any;
  constructor() { }

  getOverview() {
    return this.overview;
  }
  setOverview(overview) {
    this.overview = overview;
  }

  getUsers() {
    return this.users;
  }
  setUsers(users) {
    this.users = users;
  }
  getUser(userId) {
    if (this.users && this.users.length) {
      return this.users.find(item => {
        return parseInt(userId, 10) === item.user_log_id;
      });
    } else {
      return null;
    }
  }

}

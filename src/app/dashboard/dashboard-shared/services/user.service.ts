import { Injectable } from '@angular/core';
import { HttpService } from '../../../shared/services/http.service';

@Injectable()
export class UserService {

  constructor(private httpService: HttpService) { }

  getUsers(): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        const page = 1;
        const limit = 100;
        this.httpService.get(`users/${page}/${limit}`).subscribe(value => {
          return resolve(value);
        }, error => {
          return reject(error);
        });
      } catch (err) {
        return reject(err);
      }
    });
  }

  getUser(user_id): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.httpService.get(`user/${user_id}`).subscribe(value => {
          return resolve(value);
        }, error => {
          return reject(error);
        });
      } catch (err) {
        return reject(err);
      }
    });
  }

  searchUsers(input): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.httpService.post(`searchUsers`, input).subscribe(value => {
          return resolve(value);
        }, error => {
          return reject(error);
        });
      } catch (err) {
        return reject(err);
      }
    });
  }

  getProperties(user_id): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.httpService.get(`user/properties/${user_id}`).subscribe(value => {
          return resolve(value);
        }, error => {
          return reject(error);
        });
      } catch (err) {
        return reject(err);
      }
    });
  }

  saveUser(input): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.httpService.post(`user`, input).subscribe(value => {
          return resolve(value);
        }, error => {
          return reject(error);
        });
      } catch (err) {
        return reject(err);
      }
    });
  }

  updateUser(input): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.httpService.put(`user`, input).subscribe(value => {
          return resolve(value);
        }, error => {
          return reject(error);
        });
      } catch (err) {
        return reject(err);
      }
    });
  }
  deleteUser(userId): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.httpService.delete(`user/${userId}`).subscribe(value => {
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

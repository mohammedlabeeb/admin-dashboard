import { SortPipe } from './../../shared/pipes/sort.pipe';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../dashboard-shared/services/user.service';
import { CacheService } from '../dashboard-shared/services/cache.service';
import { DataService } from '../../shared/services/data.service';
import { DataTableResource } from '../../shared/libs/data-table';
import { UserList } from '../dashboard-shared/types/dashboard';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  itemResource;
  items = [];
  itemCount = 0;
  limit = 20;
  SUserID = '';
  SName = '';
  SEmail = '';
  showLoader = true;
  pagination = false;
  addNewModal: any = {};
  userForm: FormGroup;
  deletingUser = '';
  deletingUserID = '';
  addModalVisibility = new BehaviorSubject<boolean>(false);
  deleteModalVisibility = new BehaviorSubject<boolean>(false);

  constructor(
    private dataService: DataService,
    private userService: UserService,
    private cache: CacheService,
    private fb: FormBuilder,
    private sortPipe: SortPipe
  ) {
    this.userForm = this.fb.group({
      'firstName': [, Validators.required],
      'lastName': [null, Validators.required],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'age': [null, Validators.compose([Validators.required])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
      'id': [null]
    });
  }



  reloadItems(params) {
    this.itemResource.query(params).then(items => this.items = items);
  }

  // special properties:

  rowClick(rowEvent) {
    console.log('Clicked: ' + rowEvent.row.item.name);
  }

  rowDoubleClick(rowEvent) {
    alert('Double clicked: ' + rowEvent.row.item.name);
  }

  rowTooltip(item) { return item.jobTitle; }

  ngOnInit() {
    this.dataService.updateTitle('MajorDomo Users');
    this.setAddNewModal();
    const users = this.cache.getUsers() || [];
    if (users && users.length) {
      this.loadData(users);
      this.showLoader = false;
    } else {
      this.refreshData();
    }
  }

  private refreshData() {
    this.items = [];
    this.itemCount = 0;
    this.userService.getUsers().then(resp => {
      resp = this.sortPipe.transform(resp, ['-user_timestamp']);
      this.cache.setUsers(resp);
      this.loadData(resp);
      this.showLoader = false;
    }).catch(err => {
      console.log(err);
    });
  }
  private loadData(users) {
    const userData: UserList[] = [];
    if (users && users.length) {
      users.forEach(element => {
        const user: UserList = {
          name: `${element.user_first_name} ${element.user_last_name}`,
          email: element.user_email,
          age: element.user_age,
          userId: element.user_log_id,
          uniqueId: element.user_unique_id,
          date: element.user_timestamp,
          verified: element.user_email_verified ? true : false,
          private: element.user_privacy_set ? true : false,
          properties: element.properties !== null ? element.properties : 0,
          claimed: element.claimed !== null ? element.claimed : 0,
        };
        userData.push(user);
      });
    }
    this.itemResource = new DataTableResource(userData);
    this.itemResource.count().then(count => this.itemCount = count);
  }

  async searchCustomer() {
    this.showLoader = true;
    const searchObj = {
      userid: this.SUserID,
      name: this.SName,
      email: this.SEmail
    };
    this.items = [];
    this.itemCount = 0;
    const resp = await this.userService.searchUsers(searchObj);
    this.showLoader = false;
    if (resp && resp.length) {
      this.cache.setUsers(resp);
      this.loadData(resp);
    }
  }

  setAddNewModal() {
    this.addNewModal.id = 'AddNewModal';
    this.addNewModal.title = 'Add New User';
    this.addNewModal.show = false;
    this.addNewModal.button = false;
  }


  async submitForm(value) {
    try {
      const formData = {
        user_first_name: value.firstName,
        user_last_name: value.lastName,
        user_email: value.email,
        user_password: value.password,
        user_age: value.age
      };
      let res;
      if (value.id && value.id !== '') {
        formData['user_log_id'] = value.id;
        if (formData['user_password'] === 'current_password' || !formData['user_password']) {
          delete formData['user_password'];
        }
        res = await this.userService.updateUser(formData);
        if (res) {
          this.addModalVisibility.next(false);
          this.dataService.setNotifications('success', 'User Updated successfully.');
        }
      } else {
        res = await this.userService.saveUser(formData);
        if (res) {
          this.addModalVisibility.next(false);
          this.dataService.setNotifications('success', 'User created successfully.');
        }
      }
      this.refreshData();
    } catch (e) {
      this.dataService.setNotifications('error', 'Error in Submission.');
    }
  }

  loadEditModal(item) {
    this.addNewModal.title = 'Edit User';
    const users = this.cache.getUsers() || [];
    if (users && users.length) {
      const user = users.find(uitem => {
        return uitem.user_log_id === item.userId;
      });
      if (user) {
        this.userForm.patchValue({
          firstName: user.user_first_name,
          lastName: user.user_last_name,
          age: user.user_age,
          email: user.user_email,
          id: user.user_log_id,
          password: 'current_password'
        });
      }
    }
    // this.userForm.value.age = item.user_age;
    this.addModalVisibility.next(true);
  }

  displayModal(id) {
    if (id === '#addNewModal') {
      this.addNewModal.title = 'Add User';
      this.addModalVisibility.next(true);
      console.log(this.addNewModal);
    }
  }

  deleteConfirmation(item) {
    this.deletingUser = item.name;
    this.deletingUserID = item.userId;
    this.deleteModalVisibility.next(true);
  }

  async deleteUser(userID) {
    try {
      if (userID) {
        const res = await this.userService.deleteUser(userID);
        if (res) {
          this.refreshData();
          this.deleteModalVisibility.next(false);
          this.dataService.setNotifications('success', 'User delted successfully.');
        }
      }
    } catch (e) {
      this.deleteModalVisibility.next(false);
      this.dataService.setNotifications('error', 'Error in Deletion');
    }
  }

}


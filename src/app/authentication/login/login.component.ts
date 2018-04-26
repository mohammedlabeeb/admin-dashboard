import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpService } from '../../shared/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(fb: FormBuilder, private httpService: HttpService, private router: Router) {
    this.loginForm = fb.group({
      'userName': [null, Validators.required],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(5)])],
    });
  }

  ngOnInit() {

  }
  submitLogin(value: any): void {
    const body = {
      'user_email': value.userName,
      'user_password': value.password
    };
    this.httpService.validateAdmin(body).subscribe(authVal => {
      console.log('1st', authVal);
      if (authVal && authVal.success) {
        sessionStorage.setItem('majordomo-token', authVal.token);
        sessionStorage.setItem('user_unique_id', authVal.user_unique_id);
        this.httpService.get('validate').subscribe(resp => {
          if (resp && resp.admin_accunout) {
            console.log('navigation Begin');
            sessionStorage.setItem('majordomo-admin', 'true');
            this.router.navigate(['/dashboard']);
          }
        });
      }
    });
  }

}

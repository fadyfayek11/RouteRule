import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import * as alertify from 'alertifyjs';
import { Login } from '../Models/LoginModel';
import { apiService } from '../shared/apiService.service';
import { RulesListComponent } from '../rules-list/rules-list.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private api: apiService,
    private builder: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  usernameControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [Validators.required]);

  userForm = this.builder.group({
    username: this.usernameControl,
    password: this.passwordControl,
    // isactive: this.builder.control(true),
  });

  Submit() {
    if (this.userForm.valid) {
      let user: Login = {
        UserName: this.userForm.get('username')?.value!,
        Password: this.userForm.get('password')?.value!,
      };
      //console.log(user);

      this.api.Login(user).subscribe(
        (response) => {
          // console.log(response)
          if (response.message == 'Login done successfully') {
            alertify.success('Logging in succesfully');
            this._router.navigateByUrl('/list');
          } else {
            alertify.warning('Invalid user');
            this.userForm.get('username')?.setValue('');
            this.userForm.get('password')?.setValue('');
          }
        },
        (error) => {
          alertify.warning('Server error');
        }
      );
    }
  }
}

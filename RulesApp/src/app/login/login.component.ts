import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { Subject } from 'rxjs';
import * as alertify from 'alertifyjs';
import { Login } from '../Models/LoginModel';
import { apiService } from '../shared/apiService.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  // public loginValid = true;
  // public username = '';
  // public password = '';

  // private _destroySub$ = new Subject<void>();
  // private readonly returnUrl: string;

  constructor(private api: apiService, private builder: FormBuilder, private _router: Router)
   {}

   ngOnInit(): void { }

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
      console.log(user);

      this.api.Login(user).subscribe(
        (response) => {
          alertify.success('Logging in succesfully');
        },
        (error) => {
          alertify.warning('logging failed');
        }
      );
    }
  }
}

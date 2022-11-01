import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private api: apiService) { }

  ngOnInit(): void {
  }


usernameControl =new FormControl('', [Validators.required]);
passwordControl = new FormControl('', [Validators.required]);

  form: FormGroup = new FormGroup({
    username:this.usernameControl,
    password:this.passwordControl
  });


  submit()
  {

  }
}

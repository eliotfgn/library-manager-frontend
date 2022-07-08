import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {LoginPayload} from "../../payloads/login.payload";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  form: FormGroup;
  payload: LoginPayload;
  logged: boolean = true;

  constructor(private authService: AuthService, private router: Router) {
    this.payload = {
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {

    this.form = new FormGroup({
      'username': new FormControl(null),
      'password': new FormControl(null)
    });
  }

  login() {
    this.payload.username = this.form.value.username;
    this.payload.password = this.form.value.password;

    this.authService.login(this.payload).subscribe(data => {
      this.router.navigateByUrl('');
      },
        error => {
      if (error.status == 403) {
        this.logged = false;
        console.log(this.logged);
      }
        });

  }

}

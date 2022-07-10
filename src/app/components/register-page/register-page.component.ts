import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {RegisterPayload} from "../../payloads/register.payload";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  form: FormGroup;
  payload: RegisterPayload;

  constructor(private authService: AuthService, private router: Router) {
    this.payload = {
      name: '',
      email: '',
      username: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      'lastname': new FormControl(null),
      'firstname': new FormControl(null),
      'email': new FormControl(null, Validators.email),
      'username': new FormControl(null),
      'password': new FormControl(null)
    });
  }

  register() {
    this.payload.name = this.form.value.firstname + ' ' + this.form.value.lastname;
    this.payload.username = this.form.value.username;
    this.payload.email = this.form.value.email;
    this.payload.password = this.form.value.password;

    this.authService.register(this.payload).subscribe(data => {
      this.router.navigateByUrl('');
      },
      error => {console.log(error)});
  }

}

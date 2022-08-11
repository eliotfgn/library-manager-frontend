import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {RegisterPayload} from "../payloads/register.payload";
import {map, Observable} from "rxjs";
import {LoginPayload} from "../payloads/login.payload";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentLoggedInUser: string;

  constructor(private http: HttpClient) {
  }

  register(payload: RegisterPayload): Observable<boolean> {
    let logged = false;
    return this.http.post('http://localhost:8080/api/auth/signup', payload)
      .pipe(map(data => {
        // @ts-ignore
        let loginPayload: LoginPayload = {
          username: payload.username,
          password: payload.password
        };
        this.login(loginPayload).subscribe(data => {},
          error => {console.log(error)},
          () => {logged = true});
        return logged;
      }));
  }

  login(payload: LoginPayload): Observable<any> {
    console.log('login started')
    this.setCurrentLoggedInUser(payload.username);
    return this.http.post('http://localhost:8080/api/auth/login', payload)
      .pipe(
        map(data => {
          localStorage.clear();
          // @ts-ignore
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', payload.username);
          console.log('local storage changed');
      }));
  }

  public getCurrentLoggedInUser(): string {
    // @ts-ignore
    return localStorage.getItem('username');
  }

  public setCurrentLoggedInUser(user: string) {
    this.currentLoggedInUser = user;
  }

  public getToken(): string {
    // @ts-ignore
    return localStorage.getItem('token');
  }

  public isAuthenticated(): boolean {
    return this.getToken() != null;
  }

  public logout(): void {
    localStorage.clear();
  }

}

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

  register(payload: RegisterPayload): Observable<any> {
    return this.http.post('http://localhost:8080/api/auth/signup', payload)
      .pipe(map(data => {
        // @ts-ignore
        let loginPayload: LoginPayload = {
          username: payload.username,
          password: payload.password
        };
        this.login(loginPayload).subscribe();
        console.log(this.currentLoggedInUser);
      }));
  }

  login(payload: LoginPayload): Observable<any> {
    this.setCurrentLoggedInUser(payload.username);
    return this.http.post('http://localhost:8080/api/auth/login', payload)
      .pipe(map(data => {
        localStorage.clear();
        // @ts-ignore
        localStorage.setItem('token', data.token);
      }));
  }

  public getCurrentLoggedInUser(): string {
    return this.currentLoggedInUser;
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

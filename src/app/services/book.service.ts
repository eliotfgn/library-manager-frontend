import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  public getTags(): Observable<any> {
    return this.http.get('http://localhost:8080/api/books/tags');
  }

  public getBooksByTag(tag: string): Observable<any> {
    return this.http.get('http://localhost:8080/api/books/by-tag/' + tag);
  }

}

import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../payloads/book.model";

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksForTag = new Map();

  constructor(private http: HttpClient) { }

  public getTags(): Observable<any> {
    return this.http.get('http://localhost:8080/api/books/tags');
  }

  public getBooksByTag(tag: string): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:8080/api/books/by-tag/' + tag);
  }

}

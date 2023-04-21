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

  public getBook(id: string): Observable<Book> {
    return this.http.get<Book>('http://localhost:8080/api/books/' + id);
  }

  public getBookCover(title: string): Observable<any> {
    return this.http.get('https://www.googleapis.com/books/v1/volumes?q='+this.formatTitle(title)+'&maxResults=3');
  }

  private formatTitle(title: string): string {
    let words = title.split(" ");
    title = words.join("+");
    title = title.replace(",", "");
    return title;
  }

  public addBook(payload: Book): Observable<any> {
    console.log(payload);
    return this.http.post('http://localhost:8080/api/books/add', payload);
  }

}
